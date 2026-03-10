import { describe, it, expect } from "vitest";
import {
  add,
  sub,
  scale,
  norm,
  matVec,
  matMul,
  transpose,
  identity,
  skew,
  expSO3,
  Rx,
  Ry,
  Rz,
  positionAt,
  velocityAt,
  accelerationAt,
  rotationAt,
  groundTruthAt,
} from "./imuMath";
import type { Mat3, Vec3 } from "./imuMath";

// ─── Helpers ────────────────────────────────────────────────────────────────

function det3(R: Mat3): number {
  return (
    R[0][0] * (R[1][1] * R[2][2] - R[1][2] * R[2][1]) -
    R[0][1] * (R[1][0] * R[2][2] - R[1][2] * R[2][0]) +
    R[0][2] * (R[1][0] * R[2][1] - R[1][1] * R[2][0])
  );
}

function matClose(A: Mat3, B: Mat3, eps = 1e-6): boolean {
  for (let i = 0; i < 3; i += 1) {
    for (let j = 0; j < 3; j += 1) {
      if (Math.abs(A[i][j] - B[i][j]) > eps) return false;
    }
  }
  return true;
}

function vecClose(a: Vec3, b: Vec3, eps = 1e-6): boolean {
  return Math.abs(a[0] - b[0]) < eps && Math.abs(a[1] - b[1]) < eps && Math.abs(a[2] - b[2]) < eps;
}

function frobeniusNorm(A: Mat3): number {
  let sum = 0;
  for (let i = 0; i < 3; i += 1) {
    for (let j = 0; j < 3; j += 1) {
      sum += A[i][j] * A[i][j];
    }
  }
  return Math.sqrt(sum);
}

function matSub(A: Mat3, B: Mat3): Mat3 {
  return A.map((row, i) => row.map((v, j) => v - B[i][j]) as Vec3) as Mat3;
}

// ─── Vector ops ─────────────────────────────────────────────────────────────

describe("add", () => {
  it("adds two zero vectors", () => {
    expect(add([0, 0, 0], [0, 0, 0])).toEqual([0, 0, 0]);
  });

  it("adds two non-zero vectors", () => {
    expect(add([1, 2, 3], [4, 5, 6])).toEqual([5, 7, 9]);
  });

  it("is commutative", () => {
    const a: Vec3 = [1, -2, 3.5];
    const b: Vec3 = [0.5, 7, -1];
    expect(vecClose(add(a, b), add(b, a))).toBe(true);
  });
});

describe("sub", () => {
  it("subtracts identical vectors to zero", () => {
    expect(sub([3, 3, 3], [3, 3, 3])).toEqual([0, 0, 0]);
  });

  it("subtracts correctly", () => {
    expect(sub([5, 7, 9], [1, 2, 3])).toEqual([4, 5, 6]);
  });
});

describe("scale", () => {
  it("scales by zero gives zero vector", () => {
    expect(scale([1, 2, 3], 0)).toEqual([0, 0, 0]);
  });

  it("scales by one is identity", () => {
    expect(scale([1, 2, 3], 1)).toEqual([1, 2, 3]);
  });

  it("scales by negative", () => {
    expect(scale([1, -2, 3], -2)).toEqual([-2, 4, -6]);
  });
});

describe("norm", () => {
  it("norm of zero vector is zero", () => {
    expect(norm([0, 0, 0])).toBe(0);
  });

  it("norm of unit x vector is 1", () => {
    expect(norm([1, 0, 0])).toBeCloseTo(1);
  });

  it("norm of [3, 4, 0] is 5", () => {
    expect(norm([3, 4, 0])).toBeCloseTo(5);
  });

  it("norm of [1, 1, 1] is sqrt(3)", () => {
    expect(norm([1, 1, 1])).toBeCloseTo(Math.sqrt(3));
  });
});

// ─── Matrix ops ─────────────────────────────────────────────────────────────

describe("matMul with identity", () => {
  const A: Mat3 = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ];

  it("identity * A = A", () => {
    expect(matClose(matMul(identity(), A), A)).toBe(true);
  });

  it("A * identity = A", () => {
    expect(matClose(matMul(A, identity()), A)).toBe(true);
  });
});

describe("transpose", () => {
  it("transpose of identity is identity", () => {
    expect(matClose(transpose(identity()), identity())).toBe(true);
  });

  it("transpose is involution: transpose(transpose(A)) = A", () => {
    const A: Mat3 = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ];
    expect(matClose(transpose(transpose(A)), A)).toBe(true);
  });
});

describe("matVec", () => {
  it("identity * v = v", () => {
    const v: Vec3 = [1, 2, 3];
    expect(vecClose(matVec(identity(), v), v)).toBe(true);
  });

  it("rotation preserves vector norm", () => {
    const R = Rx(0.7);
    const v: Vec3 = [1, 2, 3];
    expect(norm(matVec(R, v))).toBeCloseTo(norm(v));
  });
});

describe("matMul associativity", () => {
  it("(A*B)*C = A*(B*C)", () => {
    const A: Mat3 = Rx(0.3);
    const B: Mat3 = Ry(0.5);
    const C: Mat3 = Rz(0.7);
    expect(matClose(matMul(matMul(A, B), C), matMul(A, matMul(B, C)))).toBe(true);
  });
});

// ─── skew ────────────────────────────────────────────────────────────────────

describe("skew", () => {
  it("skew is antisymmetric: skew(w) = -transpose(skew(w))", () => {
    const w: Vec3 = [1, 2, 3];
    const S = skew(w);
    const St = transpose(S);
    // skew(w)[i][j] = -skew(w)[j][i]
    for (let i = 0; i < 3; i += 1) {
      for (let j = 0; j < 3; j += 1) {
        expect(S[i][j]).toBeCloseTo(-St[i][j]);
      }
    }
  });

  it("skew([1,0,0]) * [0,1,0] = [0,0,1] (x cross y = z)", () => {
    const result = matVec(skew([1, 0, 0]), [0, 1, 0]);
    expect(vecClose(result, [0, 0, 1])).toBe(true);
  });

  it("skew([0,1,0]) * [0,0,1] = [1,0,0] (y cross z = x)", () => {
    const result = matVec(skew([0, 1, 0]), [0, 0, 1]);
    expect(vecClose(result, [1, 0, 0])).toBe(true);
  });

  it("skew([0,0,1]) * [1,0,0] = [0,1,0] (z cross x = y)", () => {
    const result = matVec(skew([0, 0, 1]), [1, 0, 0]);
    expect(vecClose(result, [0, 1, 0])).toBe(true);
  });
});

// ─── expSO3 ──────────────────────────────────────────────────────────────────

describe("expSO3", () => {
  it("expSO3([0,0,0], 0.1) ≈ identity", () => {
    const R = expSO3([0, 0, 0], 0.1);
    expect(matClose(R, identity(), 1e-6)).toBe(true);
  });

  it("result is in SO(3): R^T R = I", () => {
    const w: Vec3 = [0.3, -0.5, 0.7];
    const R = expSO3(w, 0.1);
    expect(matClose(matMul(transpose(R), R), identity(), 1e-10)).toBe(true);
  });

  it("det(expSO3(w, dt)) = 1", () => {
    const R = expSO3([1, 2, 3], 0.05);
    expect(det3(R)).toBeCloseTo(1, 10);
  });

  it("expSO3([0,0,1], π) ≈ Rz(π)", () => {
    const R = expSO3([0, 0, 1], Math.PI);
    const Rz_pi: Mat3 = [[-1, 0, 0], [0, -1, 0], [0, 0, 1]];
    expect(matClose(R, Rz_pi, 1e-6)).toBe(true);
  });

  it("expSO3([1,0,0], π/2) ≈ Rx(π/2)", () => {
    const R = expSO3([1, 0, 0], Math.PI / 2);
    expect(matClose(R, Rx(Math.PI / 2), 1e-6)).toBe(true);
  });

  it("group property on same axis: expSO3(w, t1) * expSO3(w, t2) = expSO3(w, t1+t2)", () => {
    const w: Vec3 = [0, 0, 1];
    const t1 = 0.4;
    const t2 = 0.6;
    const R1 = expSO3(w, t1);
    const R2 = expSO3(w, t2);
    const R12 = matMul(R1, R2);
    const R_combined = expSO3(w, t1 + t2);
    expect(matClose(R12, R_combined, 1e-6)).toBe(true);
  });
});

// ─── Rotation constructors ───────────────────────────────────────────────────

describe("Rx / Ry / Rz", () => {
  it("Rx(0) = identity", () => {
    expect(matClose(Rx(0), identity())).toBe(true);
  });

  it("Ry(0) = identity", () => {
    expect(matClose(Ry(0), identity())).toBe(true);
  });

  it("Rz(0) = identity", () => {
    expect(matClose(Rz(0), identity())).toBe(true);
  });

  it("Rx(π/2) * [0,1,0] = [0,0,1] (y→z)", () => {
    const result = matVec(Rx(Math.PI / 2), [0, 1, 0]);
    expect(vecClose(result, [0, 0, 1])).toBe(true);
  });

  it("Rz(π/2) * [1,0,0] = [0,1,0] (x→y)", () => {
    const result = matVec(Rz(Math.PI / 2), [1, 0, 0]);
    expect(vecClose(result, [0, 1, 0])).toBe(true);
  });
});

// ─── Ground truth trajectory ─────────────────────────────────────────────────

describe("positionAt", () => {
  it("positionAt(0) = [0, 0, 0]", () => {
    expect(vecClose(positionAt(0), [0, 0, 0])).toBe(true);
  });
});

describe("velocityAt", () => {
  it("matches finite-difference of positionAt", () => {
    const t = 2.5;
    const h = 1e-5;
    const fdVel = scale(sub(positionAt(t + h), positionAt(t - h)), 1 / (2 * h));
    const vel = velocityAt(t);
    // velocityAt uses h=1e-3 internally, so allow some tolerance
    expect(vecClose(vel, fdVel, 1e-4)).toBe(true);
  });
});

describe("accelerationAt", () => {
  it("matches finite-difference of velocityAt", () => {
    const t = 3.0;
    const h = 1e-3;
    const fdAcc = scale(sub(velocityAt(t + h), velocityAt(t - h)), 1 / (2 * h));
    const acc = accelerationAt(t);
    expect(vecClose(acc, fdAcc, 0.01)).toBe(true);
  });
});

describe("rotationAt", () => {
  it("satisfies R^T R = I for t=0", () => {
    const R = rotationAt(0);
    expect(matClose(matMul(transpose(R), R), identity(), 1e-10)).toBe(true);
  });

  it("satisfies R^T R = I for t=1", () => {
    const R = rotationAt(1);
    expect(matClose(matMul(transpose(R), R), identity(), 1e-10)).toBe(true);
  });

  it("satisfies R^T R = I for t=5", () => {
    const R = rotationAt(5);
    expect(matClose(matMul(transpose(R), R), identity(), 1e-10)).toBe(true);
  });

  it("has det = 1", () => {
    const R = rotationAt(2.5);
    expect(det3(R)).toBeCloseTo(1, 10);
  });
});

// ─── Zero-noise integration ──────────────────────────────────────────────────

describe("zero-noise integration", () => {
  const DT = 1 / 120;
  const DURATION = 3; // seconds

  function integrate(duration: number) {
    const truth0 = groundTruthAt(0);
    let expR: Mat3 = truth0.R;
    let expP: Vec3 = truth0.p;
    let expV: Vec3 = truth0.v;
    let t = 0;

    while (t < duration) {
      const truth = groundTruthAt(t);
      const aWorld = matVec(expR, truth.fBody); // rotate with R_k before updating
      const dR = expSO3(truth.gyroBody, DT);
      expR = matMul(expR, dR);
      expP = add(add(expP, scale(expV, DT)), scale(aWorld, 0.5 * DT * DT));
      expV = add(expV, scale(aWorld, DT));
      t += DT;
    }

    return { expP, expR };
  }

  it("position error after 3 s is < 0.01 m with zero noise", () => {
    const { expP } = integrate(DURATION);
    const truth = groundTruthAt(DURATION);
    const err = norm(sub(expP, truth.p));
    expect(err).toBeLessThan(0.01);
  });

  it("orientation error (Frobenius) after 3 s is < 0.01 with zero noise", () => {
    const { expR } = integrate(DURATION);
    const truth = groundTruthAt(DURATION);
    const diff = matSub(expR, truth.R);
    const err = frobeniusNorm(diff);
    expect(err).toBeLessThan(0.01);
  });
});

describe("drift magnitude over time (zero noise)", () => {
  const DT = 1 / 120;

  function integrateFor(duration: number) {
    const truth0 = groundTruthAt(0);
    let expR: Mat3 = truth0.R;
    let expP: Vec3 = truth0.p;
    let expV: Vec3 = truth0.v;
    let t = 0;
    while (t < duration) {
      const truth = groundTruthAt(t);
      const aWorld = matVec(expR, truth.fBody);
      const dR = expSO3(truth.gyroBody, DT);
      expR = matMul(expR, dR);
      expP = add(add(expP, scale(expV, DT)), scale(aWorld, 0.5 * DT * DT));
      expV = add(expV, scale(aWorld, DT));
      t += DT;
    }
    return norm(sub(expP, groundTruthAt(duration).p));
  }

  it("reports drift at 3s, 9s, 18s, 36s", () => {
    for (const t of [3, 9, 18, 36]) {
      const err = integrateFor(t);
      console.log(`  t=${t}s  drift = ${(err * 100).toFixed(2)} cm`);
    }
  });
});
