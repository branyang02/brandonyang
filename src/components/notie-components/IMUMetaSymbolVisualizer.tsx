import { useEffect, useMemo, useRef, useState } from "react";
import { useDarkMode } from "../../context/DarkModeContext";
import { Button, FormControlLabel, Paper, Slider, Stack, Switch, Typography } from "@mui/material";
import { LineChart } from "@mui/x-charts";
import { Canvas } from "@react-three/fiber";
import { Html, Line, OrbitControls, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";
import {
  add,
  sub,
  scale,
  norm,
  matVec,
  matMul,
  expSO3,
  formatVec,
  pushLimited,
  groundTruthAt,
  noisyVec,
  BASE_DT,
  TRAIL_LIMIT,
} from "./imuMath";
import type { Vec3, Mat3, SimulationState, DistSample, TrajectoryMode } from "./imuMath";

type MetricCardProps = {
  title: string;
  value: string;
  subtitle?: string;
  color?: string;
};


type SceneContentsProps = {
  truthPoints: Vec3[];
  expPoints: Vec3[];
  truthCurrent: Vec3;
  expCurrent: Vec3;
  currentBodyAxes: Vec3[];
  expBodyAxes: Vec3[];
  darkMode: boolean;
};

function toThree(points: Vec3[]): THREE.Vector3[] {
  return points.map((p) => new THREE.Vector3(p[0], p[1], p[2]));
}

const ERROR_LINE_STRIDE = 15;

function SceneContents({
  truthPoints,
  expPoints,
  truthCurrent,
  expCurrent,
  currentBodyAxes,
  expBodyAxes,
  darkMode,
}: SceneContentsProps) {
  const truth3 = toThree(truthPoints);
  const exp3 = toThree(expPoints);

  const sceneBg = darkMode ? "#0f1117" : "#fafbfd";
  const gridCenter = darkMode ? "#2d3350" : "#d7dce3";
  const gridLines = darkMode ? "#1e2235" : "#edf1f6";
  const pillBg = darkMode ? "rgba(15,17,30,0.88)" : "rgba(255,255,255,0.85)";
  const pillBgFaint = darkMode ? "rgba(15,17,30,0.72)" : "rgba(255,255,255,0.70)";

  // Sample paired error lines at every ERROR_LINE_STRIDE-th trail point
  const errorPairs: [Vec3, Vec3][] = [];
  const n = Math.min(truthPoints.length, expPoints.length);
  for (let i = 0; i < n; i += ERROR_LINE_STRIDE) {
    errorPairs.push([truthPoints[i], expPoints[i]]);
  }
  // Always include the current tip
  errorPairs.push([truthCurrent, expCurrent]);

  return (
    <>
      <color attach="background" args={[sceneBg]} />
      <ambientLight intensity={darkMode ? 0.6 : 0.8} />
      <directionalLight position={[6, 8, 7]} intensity={darkMode ? 0.9 : 1.15} />
      <directionalLight position={[-6, -3, 5]} intensity={0.35} />
      <gridHelper args={[14, 14, gridCenter, gridLines]} position={[0, 0, -1.1]} />
      <axesHelper args={[1.8]} />
      {truth3.length >= 2 && (
        <Line points={truth3} color="#2563eb" lineWidth={4.5} transparent opacity={0.55} />
      )}
      {exp3.length >= 2 && (
        <Line points={exp3} color="#16a34a" lineWidth={3.5} transparent opacity={0.55} />
      )}
      {errorPairs.map(([tp, ep], idx) => (
        <Line
          key={idx}
          points={toThree([tp, ep])}
          color="#dc2626"
          lineWidth={idx === errorPairs.length - 1 ? 2 : 1.2}
          dashed
          dashSize={0.06}
          gapSize={0.04}
          transparent
          opacity={idx === errorPairs.length - 1 ? 0.85 : 0.45}
        />
      ))}
      <mesh position={truthCurrent}>
        <sphereGeometry args={[0.08, 24, 24]} />
        <meshStandardMaterial
          color="#2563eb"
          emissive="#2563eb"
          emissiveIntensity={0.2}
          transparent
          opacity={0.7}
        />
      </mesh>
      <mesh position={expCurrent}>
        <sphereGeometry args={[0.07, 24, 24]} />
        <meshStandardMaterial
          color="#16a34a"
          emissive="#16a34a"
          emissiveIntensity={0.18}
          transparent
          opacity={0.7}
        />
      </mesh>
      {currentBodyAxes.map((axis, idx) => {
        const colors = ["#ef4444", "#22c55e", "#3b82f6"];
        const labels = ["x", "y", "z"];
        const end = add(truthCurrent, scale(axis, 0.42));
        return (
          <group key={labels[idx]}>
            <Line points={toThree([truthCurrent, end])} color={colors[idx]} lineWidth={2.6} />
            <Html position={end} distanceFactor={10}>
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: colors[idx],
                  background: pillBg,
                  padding: "2px 6px",
                  borderRadius: 999,
                  border: `1px solid ${colors[idx]}33`,
                  whiteSpace: "nowrap",
                }}
              >
                {labels[idx]}
              </div>
            </Html>
          </group>
        );
      })}
      {expBodyAxes.map((axis, idx) => {
        const colors = ["#ef4444", "#22c55e", "#3b82f6"];
        const labels = ["x̂", "ŷ", "ẑ"];
        const end = add(expCurrent, scale(axis, 0.3));
        return (
          <group key={`exp-${labels[idx]}`}>
            <Line
              points={toThree([expCurrent, end])}
              color={colors[idx]}
              lineWidth={1.6}
              transparent
              opacity={0.5}
            />
            <Html position={end} distanceFactor={10}>
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  color: colors[idx],
                  background: pillBgFaint,
                  padding: "1px 5px",
                  borderRadius: 999,
                  border: `1px solid ${colors[idx]}44`,
                  whiteSpace: "nowrap",
                  opacity: 0.75,
                }}
              >
                {labels[idx]}
              </div>
            </Html>
          </group>
        );
      })}
      <PerspectiveCamera makeDefault position={[5.7, 4.6, 3.6]} fov={45} />
      <OrbitControls makeDefault enablePan enableZoom enableRotate />
    </>
  );
}

function MetricCard({ title, value, subtitle, color }: MetricCardProps) {
  return (
    <Paper variant="outlined" sx={{ p: 1.5, borderRadius: 3, minWidth: 180, flex: 1 }}>
      <Typography variant="caption" sx={{ color: "text.secondary", display: "block" }}>
        {title}
      </Typography>
      <Typography
        variant="h6"
        sx={{ fontWeight: 800, color: color || "text.primary", lineHeight: 1.2, mt: 0.2 }}
      >
        {value}
      </Typography>
      {subtitle ? (
        <Typography variant="caption" sx={{ color: "text.secondary", display: "block", mt: 0.4 }}>
          {subtitle}
        </Typography>
      ) : null}
    </Paper>
  );
}


type StatsGridProps = {
  sim: SimulationState;
  truthToExp: number;
};

function StatsGrid({ sim, truthToExp }: StatsGridProps) {
  return (
    <div style={{ marginTop: 20, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12 }}>
      <MetricCard title="Simulation time" value={`${sim.simTime.toFixed(2)} s`} />
      <MetricCard
        title="Ground-truth position"
        value={formatVec(sim.truth.p, 2)}
        subtitle="world frame"
        color="#2563eb"
      />
      <MetricCard
        title="Estimated position"
        value={formatVec(sim.exp.p, 2)}
        subtitle={`distance from truth ${truthToExp.toFixed(3)} m`}
        color="#16a34a"
      />
      <MetricCard
        title="Estimated velocity"
        value={formatVec(sim.exp.v, 2)}
        subtitle={`‖v‖ = ${norm(sim.exp.v).toFixed(3)} m/s`}
        color="#16a34a"
      />
    </div>
  );
}


const MAX_CHART_POINTS = 600;

function DistanceChart({ history }: { history: DistSample[] }) {
  if (history.length < 2) return null;
  // Downsample for chart rendering if history is very long
  const stride = Math.max(1, Math.ceil(history.length / MAX_CHART_POINTS));
  const display = history.filter((_, i) => i % stride === 0);
  return (
    <div style={{ marginTop: 20 }}>
      <Typography variant="body2" sx={{ mb: 0.5, fontWeight: 600 }}>
        Distance from truth (m)
      </Typography>
      <LineChart
        xAxis={[{
          data: display.map((s) => s.t),
          label: "Time (s)",
          valueFormatter: (v: number) => `${v.toFixed(1)}s`,
        }]}
        series={[{
          data: display.map((s) => s.d),
          color: "#dc2626",
          showMark: false,
          curve: "linear",
        }]}
        height={180}
        margin={{ top: 10, right: 20, bottom: 40, left: 50 }}
      />
    </div>
  );
}

export default function IMUMetaSymbolVisualizer() {
  const { darkMode } = useDarkMode();
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [imuNoise, setImuNoise] = useState<number>(0);
  const [timeScale, setTimeScale] = useState<number>(1);
  const [dt, setDt] = useState<number>(BASE_DT);
  const [trajectoryMode, setTrajectoryMode] = useState<TrajectoryMode>("lissajous");
  const [, forceRender] = useState<number>(0);

  const rafRef = useRef<number | null>(null);
  const lastRef = useRef<number | null>(null);
  const accumulatorRef = useRef<number>(0);
  const simRef = useRef<SimulationState | null>(null);
  const imuNoiseRef = useRef<number>(imuNoise);
  const timeScaleRef = useRef<number>(timeScale);
  const dtRef = useRef<number>(dt);
  const trajectoryModeRef = useRef<TrajectoryMode>(trajectoryMode);

  // Keep refs in sync so the animation loop always reads the latest values
  useEffect(() => { imuNoiseRef.current = imuNoise; }, [imuNoise]);
  useEffect(() => { timeScaleRef.current = timeScale; }, [timeScale]);
  useEffect(() => { dtRef.current = dt; }, [dt]);
  useEffect(() => { trajectoryModeRef.current = trajectoryMode; }, [trajectoryMode]);

  const resetSimulation = () => {
    const truth0 = groundTruthAt(0, trajectoryMode);
    simRef.current = {
      simTime: 0,
      truth: truth0,
      imu: {
        accelBody: truth0.fBody,
        gyroBody: truth0.gyroBody,
        accelWorldFromExp: truth0.a,
      },
      exp: {
        R: truth0.R,
        p: truth0.p,
        v: truth0.v,
      },
      truthTrail: [truth0.p],
      expTrail: [truth0.p],
      distHistory: [{ t: 0, d: 0 }],
    };
    accumulatorRef.current = 0;
    lastRef.current = null;
    forceRender((n) => n + 1);
  };

  useEffect(() => { resetSimulation(); }, []);
  useEffect(() => { resetSimulation(); }, [trajectoryMode]);

  useEffect(() => {
    const stepSimulation = (dt: number) => {
      const sim = simRef.current;
      if (!sim) return;

      const truth = groundTruthAt(sim.simTime, trajectoryModeRef.current);
      const gyroNoiseSigma = imuNoiseRef.current * 0.05;
      const accelNoiseSigma = imuNoiseRef.current * 0.3;

      const imuGyro = gyroNoiseSigma > 0 ? noisyVec(truth.gyroBody, gyroNoiseSigma) : truth.gyroBody;
      const imuAccel = accelNoiseSigma > 0 ? noisyVec(truth.fBody, accelNoiseSigma) : truth.fBody;

      // Rotate body-frame accel to world frame using R_k (before updating rotation).
      // fBody was measured in the frame of R_k, so using R_{k+1} here would introduce
      // a systematic rotation error every step. With zero noise this must equal a_truth.
      const aWorldExp = matVec(sim.exp.R, imuAccel);
      const dRExp = expSO3(imuGyro, dt);
      sim.exp.R = matMul(sim.exp.R, dRExp);
      sim.exp.p = add(
        add(sim.exp.p, scale(sim.exp.v, dt)),
        scale(aWorldExp, 0.5 * dt * dt),
      );
      sim.exp.v = add(sim.exp.v, scale(aWorldExp, dt));

      sim.simTime += dt;
      sim.truth = groundTruthAt(sim.simTime, trajectoryModeRef.current);
      sim.imu = {
        accelBody: imuAccel,
        gyroBody: imuGyro,
        accelWorldFromExp: aWorldExp,
      };

      pushLimited(sim.truthTrail, sim.truth.p, TRAIL_LIMIT);
      pushLimited(sim.expTrail, sim.exp.p, TRAIL_LIMIT);

      // Sample distance every ~0.1 s of sim-time regardless of dt
      const lastSampleT = sim.distHistory.length > 0 ? sim.distHistory[sim.distHistory.length - 1].t : -Infinity;
      if (sim.simTime - lastSampleT >= 0.1) {
        sim.distHistory.push({ t: sim.simTime, d: norm(sub(sim.truth.p, sim.exp.p)) });
      }
    };

    const animate = (now: number) => {
      if (!isRunning) {
        lastRef.current = now;
        rafRef.current = requestAnimationFrame(animate);
        return;
      }

      if (lastRef.current == null) lastRef.current = now;
      const elapsed = Math.min((now - lastRef.current) / 1000, 0.05);
      lastRef.current = now;
      accumulatorRef.current += elapsed * timeScaleRef.current;

      const stepDt = dtRef.current;
      while (accumulatorRef.current >= stepDt) {
        stepSimulation(stepDt);
        accumulatorRef.current -= stepDt;
      }

      forceRender((n) => n + 1);
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current != null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [isRunning, imuNoise]);

  const noiseLabel = useMemo(() => `IMU noise σ: ${imuNoise.toFixed(2)}`, [imuNoise]);

  const sim = simRef.current;
  if (!sim) return null;

  const truthCurrent = sim.truthTrail[sim.truthTrail.length - 1] ?? ([0, 0, 0] as Vec3);
  const expCurrent = sim.expTrail[sim.expTrail.length - 1] ?? ([0, 0, 0] as Vec3);

  const bodyAxesWorld: Vec3[] = [
    [sim.truth.R[0][0], sim.truth.R[1][0], sim.truth.R[2][0]],
    [sim.truth.R[0][1], sim.truth.R[1][1], sim.truth.R[2][1]],
    [sim.truth.R[0][2], sim.truth.R[1][2], sim.truth.R[2][2]],
  ];

  const expR: Mat3 = sim.exp.R;
  const expBodyAxesWorld: Vec3[] = [
    [expR[0][0], expR[1][0], expR[2][0]],
    [expR[0][1], expR[1][1], expR[2][1]],
    [expR[0][2], expR[1][2], expR[2][2]],
  ];

  const truthToExp = norm(sub(sim.truth.p, sim.exp.p));

  const paperBg = darkMode
    ? "linear-gradient(180deg, #1a1b2e 0%, #141520 100%)"
    : "linear-gradient(180deg, #ffffff 0%, #fbfbfd 100%)";

  return (
    <Paper elevation={3} sx={{ p: 3, borderRadius: 4, background: paperBg }}>
      <Stack
        direction={{ xs: "column", md: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", md: "center" }}
        spacing={2}
      >
        <div>
          <Typography variant="h5" sx={{ fontWeight: 800 }}>
            IMU to Position in 3D
          </Typography>
        </div>
        <Stack direction="row" spacing={1.25}>
          <Button variant="outlined" onClick={resetSimulation}>
            Reset
          </Button>
          <Button variant="contained" onClick={() => setIsRunning((v) => !v)}>
            {isRunning ? "Pause" : "Run"}
          </Button>
        </Stack>
      </Stack>

      <Paper variant="outlined" sx={{ mt: 2.5, p: 1.25, borderRadius: 4, overflow: "hidden" }}>
        <div style={{ width: "100%", height: 560, borderRadius: 12, overflow: "hidden" }}>
          <Canvas gl={{ antialias: true }} dpr={[1, 2]}>
            <SceneContents
              truthPoints={sim.truthTrail}
              expPoints={sim.expTrail}
              truthCurrent={truthCurrent}
              expCurrent={expCurrent}
              currentBodyAxes={bodyAxesWorld}
              expBodyAxes={expBodyAxesWorld}
              darkMode={darkMode}
            />
          </Canvas>
        </div>
        <Stack direction="row" spacing={2.5} sx={{ mt: 1.25, px: 0.5, flexWrap: "wrap" }}>
          {[
            { color: "#2563eb", label: "Ground truth" },
            { color: "#16a34a", label: "Estimate via exp([ω]×Δt)" },
            { color: "#dc2626", label: "Error (truth − estimate)" },
          ].map((item) => (
            <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 18, height: 4, borderRadius: 2, backgroundColor: item.color }} />
              <Typography variant="caption">{item.label}</Typography>
            </div>
          ))}
        </Stack>
      </Paper>

      <StatsGrid sim={sim} truthToExp={truthToExp} />

      <div style={{ marginTop: 20, display: "flex", gap: 40, flexWrap: "wrap", alignItems: "flex-start" }}>
        <div style={{ minWidth: 280, flex: 1, maxWidth: 400 }}>
          <Typography variant="body2" sx={{ mb: 1, fontWeight: 600 }}>
            {noiseLabel}
          </Typography>
          <Slider
            min={0}
            max={1}
            step={0.01}
            value={imuNoise}
            onChange={(_, v) => setImuNoise(v as number)}
            aria-label="IMU noise sigma"
          />
        </div>
        <div style={{ minWidth: 280, flex: 1, maxWidth: 400 }}>
          <Typography variant="body2" sx={{ mb: 1, fontWeight: 600 }}>
            {`Time scale: ${timeScale}×`}
          </Typography>
          <Slider
            min={1}
            max={20}
            step={1}
            value={timeScale}
            onChange={(_, v) => setTimeScale(v as number)}
            aria-label="Simulation time scale"
          />
        </div>
        <div style={{ minWidth: 280, flex: 1, maxWidth: 400 }}>
          <Typography variant="body2" sx={{ mb: 1, fontWeight: 600 }}>
            {`Integration step: ${(dt * 1000).toFixed(1)} ms`}
          </Typography>
          <Slider
            min={0.002}
            max={0.1}
            step={0.002}
            value={dt}
            onChange={(_, v) => setDt(v as number)}
            aria-label="Integration timestep"
          />
        </div>
        <div style={{ minWidth: 200, display: "flex", alignItems: "center", paddingTop: 4 }}>
          <FormControlLabel
            control={
              <Switch
                checked={trajectoryMode === "constant"}
                onChange={(e) => setTrajectoryMode(e.target.checked ? "constant" : "lissajous")}
              />
            }
            label={
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                Constant acceleration
              </Typography>
            }
          />
        </div>
      </div>

      <DistanceChart history={sim.distHistory} />
    </Paper>
  );
}
