"use client";

import { useEffect, useRef } from "react";

type Three = typeof import("three");
type Shapes = typeof import("./shapes");

/** Dots in the cloud. Every shape is sampled to this many points so any shape can morph into any other. */
const COUNT = 8000;
const MORPH_MS = 900;
/** Share of the morph over which the points' start times are spread. */
const STAGGER = 0.4;
/** How far the cloud swells halfway through a morph. */
const BLOOM = 0.18;
const CAMERA_Z = 4.4;
/** Dot diameter in CSS pixels on a 22rem stage, at the centre of the shape. */
const DOT_PX = 2.6;
const DOT_REF_PX = 352;
/** Pointer reach, in viewport heights. */
const REACH = 0.3;
/** Spring that pulls a flung dot home, and its damping. Underdamped, so dots overshoot once and settle. */
const SPRING = 55;
const DAMPING = 6.5;
/** How hard a moving pointer flings dots, and the gentle push it gives while resting. */
const FLING = 16;
const NUDGE = 0.45;
const MAX_OFFSET = 1.6;
/** Half the visible height at the shape's depth, to turn viewport units into world units. */
const HALF_H = Math.tan((32 / 2) * (Math.PI / 180)) * CAMERA_Z;

const vertexShader = /* glsl */ `
  attribute vec3 aFrom;
  attribute float aRand;
  attribute vec3 aOffset;
  uniform float uMix;
  uniform float uSize;
  varying float vAccent;
  varying float vNear;

  void main() {
    float p = clamp(uMix * (1.0 + ${STAGGER.toFixed(2)}) - aRand * ${STAGGER.toFixed(2)}, 0.0, 1.0);
    float e = p * p * (3.0 - 2.0 * p);
    vec3 pos = mix(aFrom, position, e) * (1.0 + ${BLOOM.toFixed(2)} * sin(3.14159265 * e));

    vec4 world = modelMatrix * vec4(pos, 1.0);
    world.xyz += aOffset;
    vec4 view = viewMatrix * world;

    gl_Position = projectionMatrix * view;
    gl_PointSize = uSize * (0.75 + 0.5 * fract(aRand * 7.31)) / -view.z;
    vAccent = step(aRand, 0.1);
    vNear = smoothstep(${(CAMERA_Z + 1).toFixed(1)}, ${(CAMERA_Z - 1).toFixed(1)}, -view.z);
  }
`;

const fragmentShader = /* glsl */ `
  uniform vec3 uInk;
  uniform vec3 uAccent;
  varying float vAccent;
  varying float vNear;

  void main() {
    float a = smoothstep(0.5, 0.25, length(gl_PointCoord - 0.5)) * (0.3 + 0.7 * vNear);
    if (a < 0.01) discard;
    gl_FragColor = vec4(mix(uInk, uAccent, vAccent), a);
    #include <colorspace_fragment>
  }
`;

/** Same per-point progress as the vertex shader, so a morph can restart from where the dots are. */
function eased(mix: number, rand: number) {
  const p = Math.min(1, Math.max(0, mix * (1 + STAGGER) - rand * STAGGER));
  return p * p * (3 - 2 * p);
}

function mountStage(THREE: Three, { SHAPES, sampleShape: sample }: Shapes, host: HTMLElement) {
  const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false, powerPreference: "low-power" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  host.append(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 20);
  camera.position.z = CAMERA_Z;

  let current = sample(null, COUNT);
  const rand = Float32Array.from({ length: COUNT }, Math.random);
  const from = new THREE.BufferAttribute(current.slice(), 3);
  const to = new THREE.BufferAttribute(current.slice(), 3);
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", to);
  geometry.setAttribute("aFrom", from);
  geometry.setAttribute("aRand", new THREE.BufferAttribute(rand, 1));
  // Each dot's displacement from its place in the shape, in world units, and its velocity.
  const offset = new Float32Array(COUNT * 3);
  const velocity = new Float32Array(COUNT * 3);
  const offsetAttr = new THREE.BufferAttribute(offset, 3).setUsage(THREE.DynamicDrawUsage);
  geometry.setAttribute("aOffset", offsetAttr);

  const uniforms = {
    uMix: { value: 1 },
    uSize: { value: 1 },
    uInk: { value: new THREE.Color() },
    uAccent: { value: new THREE.Color() },
  };
  const material = new THREE.ShaderMaterial({
    uniforms,
    vertexShader,
    fragmentShader,
    transparent: true,
    depthTest: false,
    depthWrite: false,
  });
  const points = new THREE.Points(geometry, material);
  points.frustumCulled = false;
  scene.add(points);

  function paint() {
    const style = getComputedStyle(host);
    uniforms.uInk.value.setStyle(style.color);
    uniforms.uAccent.value.setStyle(style.accentColor);
  }

  let aspect = 1;
  function resize() {
    const { width, height } = host.getBoundingClientRect();
    if (!width || !height) return;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    aspect = width / height;
    uniforms.uSize.value = DOT_PX * renderer.getPixelRatio() * CAMERA_Z * (height / DOT_REF_PX);
  }

  /** Freezes the dots where they are now, as the start of the next morph. */
  function settle() {
    const f = from.array as Float32Array;
    const t = to.array as Float32Array;
    const mix = uniforms.uMix.value;
    for (let i = 0; i < COUNT; i++) {
      const e = eased(mix, rand[i]);
      const bloom = 1 + BLOOM * Math.sin(Math.PI * e);
      for (let j = i * 3; j < i * 3 + 3; j++) f[j] = (f[j] + (t[j] - f[j]) * e) * bloom;
    }
  }

  function show(slug: string | null) {
    const target = sample(slug, COUNT);
    if (target === current) return;
    current = target;
    settle();
    (to.array as Float32Array).set(target);
    from.needsUpdate = true;
    to.needsUpdate = true;
    uniforms.uMix.value = motion.matches ? 1 : 0;
  }

  // Pointer, in NDC. `prev` is where it was last frame, so its speed sets how hard dots get flung.
  const pointer = new THREE.Vector2(9, 9);
  const prev = new THREE.Vector2(9, 9);
  const tilt = new THREE.Vector2();
  const home = new THREE.Vector2();
  let pointerOn = false;
  const onMove = (e: PointerEvent) => {
    const r = host.getBoundingClientRect();
    pointer.set(((e.clientX - r.left) / r.width) * 2 - 1, 1 - ((e.clientY - r.top) / r.height) * 2);
    if (!pointerOn) prev.copy(pointer);
    pointerOn = true;
  };
  const onLeave = () => {
    pointerOn = false;
  };
  host.addEventListener("pointermove", onMove);
  host.addEventListener("pointerdown", onMove);
  host.addEventListener("pointerleave", onLeave);
  host.addEventListener("pointercancel", onLeave);

  const viewProj = new THREE.Matrix4();
  let moving = false;

  /**
   * Moves every dot one step: the pointer flings the dots it passes in the direction it travels,
   * harder the faster it goes, and a spring pulls each one back so it overshoots and settles.
   */
  function simulate(dt: number) {
    const s = dt / 1000;
    const f = from.array as Float32Array;
    const t = to.array as Float32Array;
    const mix = uniforms.uMix.value;
    const model = points.matrixWorld.elements;
    const vp = viewProj.multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse).elements;

    // Pointer travel this frame, in viewport heights per second.
    const mx = ((pointer.x - prev.x) * aspect) / s;
    const my = (pointer.y - prev.y) / s;
    const speed = pointerOn ? Math.min(Math.hypot(mx, my), 12) : 0;
    const dirX = speed > 0.01 ? mx / speed : 0;
    const dirY = speed > 0.01 ? my / speed : 0;
    prev.copy(pointer);

    let awake = false;
    for (let i = 0; i < COUNT; i++) {
      const o = i * 3;
      let vx = velocity[o], vy = velocity[o + 1], vz = velocity[o + 2];
      const ox = offset[o], oy = offset[o + 1], oz = offset[o + 2];

      if (pointerOn) {
        // Where the dot is on screen now, from its place in the morph plus its offset.
        const e = eased(mix, rand[i]);
        const bloom = 1 + BLOOM * Math.sin(Math.PI * e);
        const bx = (f[o] + (t[o] - f[o]) * e) * bloom;
        const by = (f[o + 1] + (t[o + 1] - f[o + 1]) * e) * bloom;
        const bz = (f[o + 2] + (t[o + 2] - f[o + 2]) * e) * bloom;
        const wx = model[0] * bx + model[4] * by + model[8] * bz + model[12] + ox;
        const wy = model[1] * bx + model[5] * by + model[9] * bz + model[13] + oy;
        const wz = model[2] * bx + model[6] * by + model[10] * bz + model[14] + oz;
        const cw = vp[3] * wx + vp[7] * wy + vp[11] * wz + vp[15];
        const dx = ((vp[0] * wx + vp[4] * wy + vp[8] * wz + vp[12]) / cw - pointer.x) * aspect;
        const dy = (vp[1] * wx + vp[5] * wy + vp[9] * wz + vp[13]) / cw - pointer.y;
        const dist = Math.hypot(dx, dy);

        if (dist < REACH) {
          const fall = (1 - dist / REACH) ** 2;
          const rx = dist > 1e-4 ? dx / dist : 0;
          const ry = dist > 1e-4 ? dy / dist : 1;
          const jitter = 0.55 + 0.9 * rand[i];
          // Fast strokes throw dots along the stroke and out to the side; a resting pointer just parts them.
          const push = fall * jitter * (FLING * speed * 0.35 + NUDGE * SPRING);
          const along = fall * jitter * FLING * speed;
          vx += ((rx * push + dirX * along) * HALF_H * s) / aspect;
          vy += (ry * push + dirY * along) * HALF_H * s;
          vz += fall * jitter * (FLING * speed * 0.5 + NUDGE * SPRING * 0.5) * s;
        }
      }

      if (vx === 0 && vy === 0 && vz === 0 && ox === 0 && oy === 0 && oz === 0) continue;

      // Damped spring back home (semi-implicit Euler).
      vx += (-SPRING * ox - DAMPING * vx) * s;
      vy += (-SPRING * oy - DAMPING * vy) * s;
      vz += (-SPRING * oz - DAMPING * vz) * s;
      let nx = ox + vx * s, ny = oy + vy * s, nz = oz + vz * s;
      const len = Math.hypot(nx, ny, nz);
      if (len > MAX_OFFSET) {
        const c = MAX_OFFSET / len;
        nx *= c; ny *= c; nz *= c;
      }
      if (len < 1e-4 && Math.abs(vx) + Math.abs(vy) + Math.abs(vz) < 1e-3) {
        nx = ny = nz = vx = vy = vz = 0;
      } else awake = true;

      offset[o] = nx; offset[o + 1] = ny; offset[o + 2] = nz;
      velocity[o] = vx; velocity[o + 1] = vy; velocity[o + 2] = vz;
    }
    return awake;
  }

  let raf = 0;
  let last = 0;
  let sway = 0;
  function frame(now: number) {
    raf = requestAnimationFrame(frame);
    const dt = Math.min(now - last, 33);
    last = now;
    if (dt <= 0) return;
    const k = (ms: number) => 1 - Math.exp(-dt / ms);

    if (uniforms.uMix.value < 1) uniforms.uMix.value = Math.min(1, uniforms.uMix.value + dt / MORPH_MS);
    tilt.lerp(pointerOn ? pointer : home, k(pointerOn ? 200 : 400));

    if (!motion.matches) sway += dt;
    points.rotation.y = Math.sin(sway / 4000) * 0.5 + tilt.x * 0.2;
    points.rotation.x = -tilt.y * 0.15;
    points.updateMatrixWorld();

    if (!motion.matches && (pointerOn || moving)) {
      moving = simulate(dt);
      offsetAttr.needsUpdate = true;
    }
    renderer.render(scene, camera);
  }

  // Render only while the stage is on screen and the tab is visible.
  let onScreen = false;
  function sync() {
    const run = onScreen && !document.hidden;
    if (run && !raf) {
      last = performance.now();
      raf = requestAnimationFrame(frame);
    } else if (!run && raf) {
      cancelAnimationFrame(raf);
      raf = 0;
    }
  }
  const io = new IntersectionObserver(([entry]) => {
    onScreen = entry.isIntersecting;
    sync();
  });
  io.observe(host);
  document.addEventListener("visibilitychange", sync);

  const ro = new ResizeObserver(resize);
  ro.observe(host);
  const theme = new MutationObserver(paint);
  theme.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  const scheme = window.matchMedia("(prefers-color-scheme: dark)");
  scheme.addEventListener("change", paint);
  paint();
  resize();

  // Sample the other shapes while the browser is idle, so the first hover on a row never stalls.
  const later = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 50));
  const unsampled = Object.keys(SHAPES);
  let warming = true;
  const warm = () => {
    const slug = unsampled.pop();
    if (!slug || !warming) return;
    sample(slug, COUNT);
    later(warm);
  };
  later(warm);

  return {
    show,
    dispose() {
      warming = false;
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      theme.disconnect();
      scheme.removeEventListener("change", paint);
      document.removeEventListener("visibilitychange", sync);
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerdown", onMove);
      host.removeEventListener("pointerleave", onLeave);
      host.removeEventListener("pointercancel", onLeave);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      // Free the context now rather than at GC, so opening rows on a phone never piles them up.
      renderer.getContext().getExtension("WEBGL_lose_context")?.loseContext();
      renderer.domElement.remove();
    },
  };
}

/**
 * A cloud of dots that takes the shape of the given project (`null` for the idle shape),
 * morphs when it changes, and scatters away from the pointer. Decorative only.
 */
export function ParticleStage({ slug, className }: { slug: string | null; className?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const stage = useRef<ReturnType<typeof mountStage> | null>(null);
  const latest = useRef(slug);

  useEffect(() => {
    latest.current = slug;
    stage.current?.show(slug);
  }, [slug]);

  useEffect(() => {
    let gone = false;
    Promise.all([import("three"), import("./shapes")]).then(([THREE, shapes]) => {
      if (gone || !host.current) return;
      stage.current = mountStage(THREE, shapes, host.current);
      stage.current.show(latest.current);
    });
    return () => {
      gone = true;
      stage.current?.dispose();
      stage.current = null;
    };
  }, []);

  return <div ref={host} className={className} aria-hidden="true" />;
}
