import * as THREE from "three";
import { MeshSurfaceSampler } from "three/addons/math/MeshSurfaceSampler.js";
import { mergeGeometries } from "three/addons/utils/BufferGeometryUtils.js";

type Vec = [number, number, number];

const { PI } = Math;

/** Marks a part as denser than its area alone would make it, so thin details still get dots. */
function dense<T extends THREE.BufferGeometry>(geometry: T, weight: number): T {
  geometry.userData.weight = weight;
  return geometry;
}

/**
 * Joins parts into one position-only geometry with a per-vertex sampling weight.
 * A part that is itself a merge keeps the weights it already has.
 */
function merge(...parts: THREE.BufferGeometry[]) {
  const flat = parts.map((part) => {
    const weight: number = part.userData.weight ?? 1;
    const g = part.index ? part.toNonIndexed() : part;
    for (const name of Object.keys(g.attributes)) if (name !== "position" && name !== "weight") g.deleteAttribute(name);
    if (!g.attributes.weight) {
      const weights = new Float32Array(g.attributes.position.count).fill(weight);
      g.setAttribute("weight", new THREE.BufferAttribute(weights, 1));
    }
    g.clearGroups();
    return g;
  });
  return mergeGeometries(flat)!;
}

/** A cylinder from `a` to `b`. */
function rod(a: Vec, b: Vec, radius: number, open = true) {
  const from = new THREE.Vector3(...a);
  const dir = new THREE.Vector3(...b).sub(from);
  const g = new THREE.CylinderGeometry(radius, radius, dir.length(), 12, 1, open).translate(0, dir.length() / 2, 0);
  g.applyQuaternion(new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.normalize()));
  return g.translate(...a);
}

function roundedRect(w: number, h: number, r: number) {
  const s = new THREE.Shape();
  const x = -w / 2;
  const y = -h / 2;
  s.moveTo(x + r, y);
  s.lineTo(x + w - r, y);
  s.quadraticCurveTo(x + w, y, x + w, y + r);
  s.lineTo(x + w, y + h - r);
  s.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  s.lineTo(x + r, y + h);
  s.quadraticCurveTo(x, y + h, x, y + h - r);
  s.lineTo(x, y + r);
  s.quadraticCurveTo(x, y, x + r, y);
  return s;
}

/** An upward triangle with rounded corners, centred on its centroid. */
function triangle(radius: number, round: number) {
  const corners = [PI / 2, (7 * PI) / 6, (11 * PI) / 6].map((a) =>
    new THREE.Vector2(Math.cos(a), Math.sin(a)).multiplyScalar(radius),
  );
  const s = new THREE.Shape();
  corners.forEach((c, i) => {
    const prev = corners[(i + 2) % 3];
    const next = corners[(i + 1) % 3];
    const into = c.clone().lerp(prev, round);
    const out = c.clone().lerp(next, round);
    if (i === 0) s.moveTo(into.x, into.y);
    else s.lineTo(into.x, into.y);
    s.quadraticCurveTo(c.x, c.y, out.x, out.y);
  });
  s.closePath();
  return s;
}

/**
 * A flat solid cut from a 2D outline: both faces and a denser rim around the outline, which
 * is what makes a flat object read as dots. Holes get no walls, so they read as clean gaps.
 */
function slab(profile: THREE.Shape, depth: number, rim = 1.6, face = 1) {
  const z = depth / 2;
  const outline = profile.getPoints(8);
  const skin: number[] = [];
  outline.forEach((a, i) => {
    const b = outline[(i + 1) % outline.length];
    skin.push(a.x, a.y, -z, b.x, b.y, -z, b.x, b.y, z, a.x, a.y, -z, b.x, b.y, z, a.x, a.y, z);
  });
  const walls = new THREE.BufferGeometry().setAttribute("position", new THREE.Float32BufferAttribute(skin, 3));
  return [
    dense(new THREE.ShapeGeometry(profile, 8).translate(0, 0, z), face),
    dense(new THREE.ShapeGeometry(profile, 8).translate(0, 0, -z), face),
    dense(walls, rim),
  ];
}

function windowHole(x0: number, x1: number, y0: number, y1: number) {
  const r = 0.05;
  const hole = roundedRect(x1 - x0, y1 - y0, r);
  return new THREE.Path(hole.getPoints(4).map((p) => p.add(new THREE.Vector2((x0 + x1) / 2, (y0 + y1) / 2))));
}

function wheels(xs: number[], y: number, z: number, radius: number) {
  return xs.flatMap((x) =>
    [z, -z].map((side) => new THREE.CylinderGeometry(radius, radius, 0.16, 28).rotateX(PI / 2).translate(x, y, side)),
  );
}

/** A closed stadium-shaped tube, the outline of one chain link. */
function chainLink(straight: number, radius: number, tube: number) {
  const points: THREE.Vector3[] = [];
  for (let i = 0; i <= 12; i++) {
    const a = -PI / 2 + (i / 12) * PI;
    points.push(new THREE.Vector3(straight / 2 + Math.cos(a) * radius, Math.sin(a) * radius, 0));
  }
  points.push(new THREE.Vector3(0, radius, 0));
  for (let i = 0; i <= 12; i++) {
    const a = PI / 2 + (i / 12) * PI;
    points.push(new THREE.Vector3(-straight / 2 + Math.cos(a) * radius, Math.sin(a) * radius, 0));
  }
  points.push(new THREE.Vector3(0, -radius, 0));
  return new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points, true), 160, tube, 12, true);
}

/** Lifts a flat book part (lying in XZ, spine along Z) into the curve of an open page. */
function bendPage(g: THREE.BufferGeometry) {
  const pos = g.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const u = Math.min(1, Math.abs(pos.getX(i)) / 1.3);
    pos.setY(i, pos.getY(i) + 0.42 * Math.sin(u * PI * 0.75));
  }
  return g;
}

function leaf(length: number, angle: number) {
  return new THREE.SphereGeometry(1, 20, 12).scale(length / 2, length / 7, 0.03).translate(length / 2, 0, 0).rotateZ(angle);
}

export const SHAPES: Record<string, () => THREE.BufferGeometry> = {
  idle: () => merge(new THREE.TorusKnotGeometry(0.8, 0.24, 240, 24, 2, 3)),

  layover() {
    const profile = new THREE.Shape();
    profile.moveTo(-2, 0.35);
    profile.lineTo(-2, 1.62);
    profile.quadraticCurveTo(-2, 1.75, -1.86, 1.75);
    profile.lineTo(1.86, 1.75);
    profile.quadraticCurveTo(2, 1.75, 2, 1.62);
    profile.lineTo(2, 0.35);
    profile.lineTo(1.68, 0.35);
    profile.absarc(1.3, 0.35, 0.38, 0, PI, false);
    profile.lineTo(-0.92, 0.35);
    profile.absarc(-1.3, 0.35, 0.38, 0, PI, false);
    profile.lineTo(-2, 0.35);
    for (let i = 0; i < 5; i++) profile.holes.push(windowHole(-1.82 + i * 0.6, -1.32 + i * 0.6, 1.0, 1.55));
    profile.holes.push(windowHole(1.25, 1.82, 0.48, 1.55));
    return merge(...slab(profile, 1.2), ...wheels([-1.3, 1.3], 0.35, 0.56, 0.3)).rotateY(-0.55);
  },

  "driving-school"() {
    const spokes = [-PI / 2, -0.2, PI + 0.2].map((a) =>
      new THREE.BoxGeometry(0.78, 0.16, 0.06).translate(0.6, 0, 0).rotateZ(a),
    );
    return merge(
      new THREE.TorusGeometry(1, 0.1, 14, 120),
      dense(new THREE.CylinderGeometry(0.26, 0.26, 0.18, 32).rotateX(PI / 2), 1.5),
      ...spokes.map((s) => dense(s, 1.5)),
    ).rotateX(-0.35);
  },

  spacefarmer() {
    return merge(
      new THREE.SphereGeometry(0.75, 48, 32),
      new THREE.RingGeometry(1.0, 1.45, 96, 2).rotateX(PI / 2 + 0.45).rotateZ(0.3),
      dense(rod([0, 0.7, 0], [0, 1.3, 0], 0.035), 3),
      dense(leaf(0.42, 0.45).translate(0, 1.18, 0), 3),
      dense(leaf(0.36, PI - 0.6).translate(0, 1.08, 0), 3),
    );
  },

  "cozy-cat-cafe"() {
    const ear = (side: 1 | -1) =>
      dense(new THREE.ConeGeometry(0.2, 0.4, 24).scale(1, 1, 0.45).rotateZ(-0.28 * side).translate(0.46 * side, 1.22, 0), 2);
    return merge(
      new THREE.LatheGeometry([0, 0.5, 0.58, 0.72].map((r, i) => new THREE.Vector2(r, [0, 0, 0.08, 1.05][i])), 48),
      dense(new THREE.CircleGeometry(0.66, 48).rotateX(-PI / 2).translate(0, 0.9, 0), 0.7),
      dense(new THREE.TorusGeometry(0.28, 0.07, 12, 32, PI).rotateZ(-PI / 2).translate(0.7, 0.55, 0), 1.5),
      ear(1),
      ear(-1),
    )
      .rotateY(-0.45)
      .rotateX(0.25);
  },

  vozniski() {
    const frame = triangle(0.95, 0.12);
    frame.holes.push(triangle(0.72, 0.1));
    return merge(
      dense(new THREE.ExtrudeGeometry(frame, { depth: 0.08, bevelEnabled: false }), 1.6),
      dense(new THREE.ShapeGeometry(triangle(0.72, 0.1)).translate(0, 0, 0.04), 0.5),
      dense(new THREE.BoxGeometry(0.09, 0.3, 0.04).translate(0, 0.06, 0.1), 4),
      dense(new THREE.BoxGeometry(0.09, 0.08, 0.04).translate(0, -0.2, 0.1), 4),
      dense(rod([0, -0.45, -0.06], [0, -2.1, -0.06], 0.05, false), 2),
    ).rotateY(0.35);
  },

  oracle() {
    // The ball has a round window on its face; the "8" floats in it.
    return merge(
      new THREE.SphereGeometry(1, 56, 40, 0, PI * 2, 0.45, PI - 0.45).rotateX(PI / 2),
      dense(new THREE.TorusGeometry(0.44, 0.03, 10, 64).translate(0, 0, 0.9), 2),
      dense(new THREE.TorusGeometry(0.1, 0.035, 10, 40).translate(0, 0.12, 0.93), 6),
      dense(new THREE.TorusGeometry(0.125, 0.035, 10, 40).translate(0, -0.13, 0.93), 6),
    )
      .rotateY(-0.25)
      .rotateX(0.1);
  },

  piranha() {
    return merge(
      new THREE.LatheGeometry([new THREE.Vector2(0, 0), new THREE.Vector2(0.55, 0), new THREE.Vector2(0.55, 0.03), new THREE.Vector2(0.05, 0.07)], 48),
      dense(rod([0, 0.05, 0], [0, 1.0, 0], 0.04), 3),
      new THREE.LatheGeometry([new THREE.Vector2(0.04, 1.0), new THREE.Vector2(0.95, 1.75)], 64),
      dense(new THREE.CircleGeometry(0.68, 48).rotateX(-PI / 2).translate(0, 1.55, 0), 0.6),
      dense(new THREE.SphereGeometry(0.12, 20, 14).translate(0.12, 1.36, 0.05), 3),
      dense(rod([0.06, 1.24, 0.05], [0.5, 2.0, 0.05], 0.018), 3),
    ).rotateX(0.3);
  },

  aljafakin() {
    const left: Vec = [-1.1, 0.82, 0];
    const right: Vec = [1.1, 1.0, 0];
    const pan = ([x, y]: Vec) => {
      const rim = y - 0.95;
      const strings = [PI / 2, (7 * PI) / 6, (11 * PI) / 6].map((a) =>
        dense(rod([x, y, 0], [x + Math.cos(a) * 0.38, rim, Math.sin(a) * 0.38], 0.012), 3),
      );
      const bowl = new THREE.SphereGeometry(0.4, 32, 12, 0, PI * 2, PI / 2, PI / 2).scale(1, 0.35, 1).translate(x, rim, 0);
      return [dense(bowl, 1.4), ...strings];
    };
    return merge(
      new THREE.CylinderGeometry(0.42, 0.55, 0.12, 40).translate(0, -1.0, 0),
      dense(rod([0, -0.94, 0], [0, 1.05, 0], 0.045, false), 2),
      dense(new THREE.SphereGeometry(0.09, 16, 12).translate(0, 1.12, 0), 2),
      dense(rod(left, right, 0.035, false), 2.5),
      ...pan(left),
      ...pan(right),
    ).rotateX(0.2);
  },

  "museum-guide"() {
    const steps = [0, 1, 2].map((i) =>
      dense(new THREE.BoxGeometry(3 - i * 0.2, 0.12, 0.9 - i * 0.12).translate(0, 0.06 + i * 0.12, 0), 0.5),
    );
    const columns = Array.from({ length: 6 }, (_, i) => {
      const x = -1.1 + i * 0.44;
      return [
        dense(new THREE.CylinderGeometry(0.085, 0.1, 1.24, 16, 1, true).translate(x, 0.98, 0), 2),
        new THREE.BoxGeometry(0.24, 0.06, 0.24).translate(x, 1.63, 0),
      ];
    }).flat();
    const tympanum = new THREE.Shape([new THREE.Vector2(-1.14, 0.08), new THREE.Vector2(1.14, 0.08), new THREE.Vector2(0, 0.44)]);
    const gable = new THREE.Shape([new THREE.Vector2(-1.4, 0), new THREE.Vector2(1.4, 0), new THREE.Vector2(0, 0.55)]);
    gable.holes.push(tympanum);
    return merge(
      ...steps,
      ...columns,
      new THREE.BoxGeometry(2.7, 0.16, 0.5).translate(0, 1.74, 0),
      dense(new THREE.ExtrudeGeometry(gable, { depth: 0.5, bevelEnabled: false }).translate(0, 1.82, -0.25), 1.6),
      dense(new THREE.ShapeGeometry(tympanum).translate(0, 1.82, 0.2), 0.4),
    )
      .rotateY(-0.3)
      .rotateX(0.12);
  },

  coloredmind() {
    const petals = Array.from({ length: 8 }, (_, i) =>
      new THREE.SphereGeometry(1, 20, 12).scale(0.36, 0.15, 0.05).translate(0.52, 0, 0).rotateZ((i * PI) / 4),
    );
    const stem = new THREE.QuadraticBezierCurve3(new THREE.Vector3(0, -0.1, -0.05), new THREE.Vector3(0.25, -0.85, 0), new THREE.Vector3(-0.05, -1.6, 0));
    return merge(
      ...petals,
      dense(new THREE.SphereGeometry(0.2, 24, 16).scale(1, 1, 0.55).translate(0, 0, 0.05), 2),
      dense(new THREE.TubeGeometry(stem, 40, 0.04, 8), 2.5),
      dense(leaf(0.55, 0.55).translate(0.16, -1.05, 0), 2),
    ).rotateY(0.35);
  },

  "fold4-linux"() {
    // Book-style fold, half open towards the viewer and seen from above so the V shows.
    const half = (side: 1 | -1) =>
      merge(
        ...slab(roundedRect(0.95, 1.95, 0.12), 0.05, 4, 0.4),
        dense(new THREE.ShapeGeometry(roundedRect(0.83, 1.83, 0.07), 6).translate(0, 0, 0.03), 1.6),
      )
        .translate(0.5 * side, 0, 0)
        .rotateY(-0.62 * side);
    return merge(half(-1), half(1), dense(rod([0, -0.975, -0.03], [0, 0.975, -0.03], 0.04, false), 2))
      .rotateY(0.12)
      .rotateX(0.42);
  },

  "t3-failover"() {
    return merge(
      chainLink(0.9, 0.38, 0.11).translate(-0.52, 0, 0),
      chainLink(0.9, 0.38, 0.11).rotateX(PI / 2).translate(0.52, 0, 0),
    )
      .rotateX(0.35)
      .rotateZ(0.3)
      .rotateY(-0.3);
  },

  knowledge() {
    // Flat strips lying in XZ, spine along Z, later lifted into the curve of the pages.
    const strip = (w: number, d: number, x: number, z: number, weight: number) =>
      dense(new THREE.PlaneGeometry(w, d, Math.max(1, Math.round(w * 20)), 1).rotateX(-PI / 2).translate(x, 0, z), weight);
    const sides = [1, -1].flatMap((side) =>
      [
        strip(1.3, 1.7, 0.65, 0, 0.35),
        strip(1.3, 0.03, 0.65, 0.85, 5),
        strip(1.3, 0.03, 0.65, -0.85, 5),
        strip(0.03, 1.7, 1.3, 0, 5),
        ...Array.from({ length: 7 }, (_, i) => strip(0.95, 0.03, 0.65, -0.6 + i * 0.19, 4)),
      ].map((g) => bendPage(g.scale(side, 1, 1))),
    );
    return merge(...sides, dense(new THREE.BoxGeometry(2.8, 0.04, 1.84).translate(0, -0.06, 0), 0.4))
      .rotateY(-0.25)
      .rotateX(0.9);
  },

  workout() {
    const plates = [1, -1].flatMap((side) => [
      new THREE.CylinderGeometry(0.5, 0.5, 0.14, 40).rotateZ(PI / 2).translate(0.62 * side, 0, 0),
      new THREE.CylinderGeometry(0.4, 0.4, 0.12, 36).rotateZ(PI / 2).translate(0.76 * side, 0, 0),
      new THREE.CylinderGeometry(0.1, 0.1, 0.08, 20).rotateZ(PI / 2).translate(0.88 * side, 0, 0),
    ]);
    return merge(dense(rod([-1.1, 0, 0], [1.1, 0, 0], 0.055, false), 2.5), ...plates)
      .rotateY(-0.5)
      .rotateZ(0.25)
      .rotateX(0.2);
  },

  crossroads() {
    const profile = new THREE.Shape();
    profile.moveTo(-1.5, 0.35);
    profile.lineTo(-1.5, 1.45);
    profile.quadraticCurveTo(-1.5, 1.6, -1.35, 1.6);
    profile.lineTo(0.85, 1.6);
    profile.quadraticCurveTo(1.12, 1.6, 1.22, 1.38);
    profile.lineTo(1.44, 0.95);
    profile.quadraticCurveTo(1.52, 0.86, 1.52, 0.7);
    profile.lineTo(1.52, 0.35);
    profile.lineTo(1.31, 0.35);
    profile.absarc(0.95, 0.35, 0.36, 0, PI, false);
    profile.lineTo(-0.59, 0.35);
    profile.absarc(-0.95, 0.35, 0.36, 0, PI, false);
    profile.lineTo(-1.5, 0.35);
    profile.holes.push(
      windowHole(-1.35, -0.55, 1.0, 1.4),
      windowHole(-0.4, 0.45, 1.0, 1.4),
      new THREE.Path([[0.62, 1.0], [1.3, 1.0], [1.1, 1.38], [0.62, 1.38]].map(([px, py]) => new THREE.Vector2(px, py))),
    );
    const roof = new THREE.Shape([new THREE.Vector2(-1.3, 0), new THREE.Vector2(0.85, 0), new THREE.Vector2(-1.3, 0.34)]);
    return merge(
      ...slab(profile, 1.3),
      dense(new THREE.ExtrudeGeometry(roof, { depth: 1.1, bevelEnabled: false }).translate(0, 1.6, -0.55), 0.8),
      ...wheels([-0.95, 0.95], 0.35, 0.6, 0.3),
    ).rotateY(-0.6);
  },

  feribot() {
    const w = 2.2;
    const h = 1.4;
    const r = 0.38;
    const x = -w / 2;
    const y = -h / 2;
    const s = new THREE.Shape();
    s.moveTo(x + r, y);
    s.lineTo(-0.45, y);
    s.lineTo(-0.85, y - 0.5);
    s.lineTo(-0.1, y);
    s.lineTo(x + w - r, y);
    s.quadraticCurveTo(x + w, y, x + w, y + r);
    s.lineTo(x + w, y + h - r);
    s.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    s.lineTo(x + r, y + h);
    s.quadraticCurveTo(x, y + h, x, y + h - r);
    s.lineTo(x, y + r);
    s.quadraticCurveTo(x, y, x + r, y);
    for (const dx of [-0.5, 0, 0.5]) s.holes.push(new THREE.Path().absarc(dx, 0, 0.13, 0, PI * 2, true));
    return merge(
      new THREE.ExtrudeGeometry(s, { depth: 0.2, bevelEnabled: true, bevelThickness: 0.05, bevelSize: 0.05, bevelSegments: 2, curveSegments: 10 }),
    )
      .rotateY(-0.3)
      .rotateX(0.1);
  },
};

const cache = new Map<string, Float32Array>();

/**
 * `count` points spread over a project's shape, centred and scaled to fit a unit sphere.
 * Projects without a shape of their own get the idle one. The same array is returned for
 * the same shape, so callers can compare by identity.
 */
export function sampleShape(slug: string | null, count: number): Float32Array {
  const key = slug && Object.hasOwn(SHAPES, slug) ? slug : "idle";
  const id = `${key}:${count}`;
  const hit = cache.get(id);
  if (hit) return hit;

  const geometry = SHAPES[key]();
  const sampler = new MeshSurfaceSampler(new THREE.Mesh(geometry)).setWeightAttribute("weight").build();
  const points = new Float32Array(count * 3);
  const p = new THREE.Vector3();
  for (let i = 0; i < count; i++) {
    sampler.sample(p);
    p.toArray(points, i * 3);
  }
  geometry.dispose();

  const box = new THREE.Box3().setFromArray(points);
  const centre = box.getCenter(new THREE.Vector3());
  let radius = 0;
  for (let i = 0; i < points.length; i += 3) radius = Math.max(radius, p.fromArray(points, i).distanceTo(centre));
  for (let i = 0; i < points.length; i += 3) p.fromArray(points, i).sub(centre).divideScalar(radius).toArray(points, i);

  cache.set(id, points);
  return points;
}
