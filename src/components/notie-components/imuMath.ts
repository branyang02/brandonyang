export type Vec3 = [number, number, number];
export type Mat3 = [Vec3, Vec3, Vec3];

export type GroundTruthState = {
  p: Vec3;
  v: Vec3;
  a: Vec3;
  R: Mat3;
  gyroBody: Vec3;
  fBody: Vec3;
};

export type IMUState = {
  accelBody: Vec3;
  gyroBody: Vec3;
  accelWorldFromExp: Vec3;
};

export type IntegratorState = {
  R: Mat3;
  p: Vec3;
  v: Vec3;
};

export type DistSample = { t: number; d: number };

export type SimulationState = {
  simTime: number;
  truth: GroundTruthState;
  imu: IMUState;
  exp: IntegratorState;
  truthTrail: Vec3[];
  expTrail: Vec3[];
  distHistory: DistSample[];
};

export const LOOP_PERIOD = 18;
export const BASE_DT = 1 / 120;
export const TRAIL_LIMIT = 900;

export function add(a: Vec3, b: Vec3): Vec3 {
  return [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
}

export function sub(a: Vec3, b: Vec3): Vec3 {
  return [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
}

export function scale(v: Vec3, s: number): Vec3 {
  return [v[0] * s, v[1] * s, v[2] * s];
}

export function norm(v: Vec3): number {
  return Math.hypot(v[0], v[1], v[2]);
}

export function matVec(R: Mat3, v: Vec3): Vec3 {
  return [
    R[0][0] * v[0] + R[0][1] * v[1] + R[0][2] * v[2],
    R[1][0] * v[0] + R[1][1] * v[1] + R[1][2] * v[2],
    R[2][0] * v[0] + R[2][1] * v[1] + R[2][2] * v[2],
  ];
}

export function matMul(A: Mat3, B: Mat3): Mat3 {
  const C: Mat3 = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];
  for (let i = 0; i < 3; i += 1) {
    for (let j = 0; j < 3; j += 1) {
      C[i][j] = A[i][0] * B[0][j] + A[i][1] * B[1][j] + A[i][2] * B[2][j];
    }
  }
  return C;
}

export function transpose(R: Mat3): Mat3 {
  return [
    [R[0][0], R[1][0], R[2][0]],
    [R[0][1], R[1][1], R[2][1]],
    [R[0][2], R[1][2], R[2][2]],
  ];
}

export function identity(): Mat3 {
  return [
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 1],
  ];
}

export function skew(w: Vec3): Mat3 {
  const [wx, wy, wz] = w;
  return [
    [0, -wz, wy],
    [wz, 0, -wx],
    [-wy, wx, 0],
  ];
}

export function vee(M: Mat3): Vec3 {
  return [M[2][1], M[0][2], M[1][0]];
}

export function addMat(A: Mat3, B: Mat3): Mat3 {
  return A.map((row, i) => row.map((value, j) => value + B[i][j]) as Vec3) as Mat3;
}

export function scaleMat(A: Mat3, s: number): Mat3 {
  return A.map((row) => row.map((value) => value * s) as Vec3) as Mat3;
}

export function subMat(A: Mat3, B: Mat3): Mat3 {
  return A.map((row, i) => row.map((value, j) => value - B[i][j]) as Vec3) as Mat3;
}

export function expSO3(w: Vec3, dt: number): Mat3 {
  const theta = norm(w) * dt;
  const W = scaleMat(skew(w), dt);
  if (theta < 1e-9) {
    return addMat(identity(), W);
  }
  const A = Math.sin(theta) / theta;
  const B = (1 - Math.cos(theta)) / (theta * theta);
  const W2 = matMul(W, W);
  return addMat(addMat(identity(), scaleMat(W, A)), scaleMat(W2, B));
}

export function Rx(a: number): Mat3 {
  const c = Math.cos(a);
  const s = Math.sin(a);
  return [
    [1, 0, 0],
    [0, c, -s],
    [0, s, c],
  ];
}

export function Ry(a: number): Mat3 {
  const c = Math.cos(a);
  const s = Math.sin(a);
  return [
    [c, 0, s],
    [0, 1, 0],
    [-s, 0, c],
  ];
}

export function Rz(a: number): Mat3 {
  const c = Math.cos(a);
  const s = Math.sin(a);
  return [
    [c, -s, 0],
    [s, c, 0],
    [0, 0, 1],
  ];
}

export function eulerBodyToWorld(roll: number, pitch: number, yaw: number): Mat3 {
  return matMul(matMul(Rz(yaw), Ry(pitch)), Rx(roll));
}

export function positionAt(t: number): Vec3 {
  const s = (2 * Math.PI * t) / LOOP_PERIOD;
  return [
    2.2 * Math.sin(s),
    1.6 * Math.sin(2 * s),
    1.0 * Math.sin(3 * s),
  ];
}

export function velocityAt(t: number): Vec3 {
  const h = 1e-3;
  const pPlus = positionAt(t + h);
  const pMinus = positionAt(t - h);
  return scale(sub(pPlus, pMinus), 1 / (2 * h));
}

export function accelerationAt(t: number): Vec3 {
  const h = 1e-3;
  const pPlus = positionAt(t + h);
  const p = positionAt(t);
  const pMinus = positionAt(t - h);
  return scale(add(sub(pPlus, scale(p, 2)), pMinus), 1 / (h * h));
}

export function rotationAt(t: number): Mat3 {
  const s = (2 * Math.PI * t) / LOOP_PERIOD;
  const v = velocityAt(t);
  const yaw = Math.atan2(v[1], v[0]);
  const speedXY = Math.hypot(v[0], v[1]) + 1e-6;
  const pitch = 0.22 * Math.atan2(v[2], speedXY);
  const roll = 0.24 * Math.sin(1.35 * s + 0.3);
  return eulerBodyToWorld(roll, pitch, yaw);
}

export function gyroBodyAt(t: number): Vec3 {
  const h = 1e-4;
  const R = rotationAt(t);
  const Rp = rotationAt(t + h);
  const Rm = rotationAt(t - h);
  const Rdot = scaleMat(subMat(Rp, Rm), 1 / (2 * h));
  const M = matMul(transpose(R), Rdot);
  const Omega = scaleMat(subMat(M, transpose(M)), 0.5);
  return vee(Omega);
}

export function groundTruthAt(t: number): GroundTruthState {
  const p = positionAt(t);
  const v = velocityAt(t);
  const a = accelerationAt(t);
  const R = rotationAt(t);
  const gyroBody = gyroBodyAt(t);
  // Ignore gravity: specific force = R^T * a (not R^T * (a - G))
  const fBody = matVec(transpose(R), a);
  return { p, v, a, R, gyroBody, fBody };
}

export function randn(): number {
  let u = 0;
  let v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}

export function noisyVec(vec: Vec3, sigma: number): Vec3 {
  return [vec[0] + sigma * randn(), vec[1] + sigma * randn(), vec[2] + sigma * randn()];
}

export function formatVec(v: Vec3, digits = 2): string {
  return `[${v.map((x) => x.toFixed(digits)).join(", ")}]`;
}

export function pushLimited<T>(array: T[], item: T, limit: number): void {
  array.push(item);
  if (array.length > limit) array.shift();
}
