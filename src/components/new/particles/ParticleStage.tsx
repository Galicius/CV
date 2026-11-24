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

const vertexShader = /* glsl */ `
  attribute vec3 aFrom;
  attribute float aRand;
  uniform float uMix;
  uniform vec2 uMouse;
  uniform float uForce;
  uniform float uAspect;
  uniform float uSize;
  varying float vAccent;
  varying float vNear;

  void main() {
    float p = clamp(uMix * (1.0 + ${STAGGER.toFixed(2)}) - aRand * ${STAGGER.toFixed(2)}, 0.0, 1.0);
    float e = p * p * (3.0 - 2.0 * p);
    vec3 pos = mix(aFrom, position, e) * (1.0 + ${BLOOM.toFixed(2)} * sin(3.14159265 * e));

    vec4 view = modelViewMatrix * vec4(pos, 1.0);
    vec4 clip = projectionMatrix * view;
    vec2 d = (clip.xy / clip.w - uMouse) * vec2(uAspect, 1.0);
    float dist = length(d);
    float push = uForce * (1.0 - smoothstep(0.0, 0.3, dist));
    view.xy += (dist > 0.0001 ? d / dist : vec2(0.0, 1.0)) * push * (0.2 + 0.3 * aRand);
    view.z += push * 0.4;

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

  const uniforms = {
    uMix: { value: 1 },
    uMouse: { value: new THREE.Vector2(9, 9) },
    uForce: { value: 0 },
    uAspect: { value: 1 },
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

  function resize() {
    const { width, height } = host.getBoundingClientRect();
    if (!width || !height) return;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    uniforms.uAspect.value = width / height;
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

  // Pointer, in NDC. The hole follows a smoothed copy so it trails the cursor a little.
  const pointer = new THREE.Vector2(9, 9);
  let pointerOn = false;
  const onMove = (e: PointerEvent) => {
    const r = host.getBoundingClientRect();
    pointer.set(((e.clientX - r.left) / r.width) * 2 - 1, 1 - ((e.clientY - r.top) / r.height) * 2);
    if (!pointerOn) uniforms.uMouse.value.copy(pointer);
    pointerOn = true;
  };
  const onLeave = () => {
    pointerOn = false;
  };
  host.addEventListener("pointermove", onMove);
  host.addEventListener("pointerdown", onMove);
  host.addEventListener("pointerleave", onLeave);
  host.addEventListener("pointercancel", onLeave);

  let raf = 0;
  let last = 0;
  let sway = 0;
  function frame(now: number) {
    raf = requestAnimationFrame(frame);
    const dt = Math.min(now - last, 50);
    last = now;
    const k = (ms: number) => 1 - Math.exp(-dt / ms);

    if (uniforms.uMix.value < 1) uniforms.uMix.value = Math.min(1, uniforms.uMix.value + dt / MORPH_MS);
    uniforms.uForce.value += ((pointerOn ? 1 : 0) - uniforms.uForce.value) * k(pointerOn ? 120 : 260);
    if (pointerOn) uniforms.uMouse.value.lerp(pointer, k(60));

    if (!motion.matches) sway += dt;
    const force = uniforms.uForce.value;
    points.rotation.y = Math.sin(sway / 4000) * 0.5 + uniforms.uMouse.value.x * 0.25 * force;
    points.rotation.x = -uniforms.uMouse.value.y * 0.2 * force;
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
