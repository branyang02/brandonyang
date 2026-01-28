import { useState, useEffect, useRef, useCallback } from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { Button, Slider, Typography } from "@mui/material";

// State names
const STATES = ["Idle", "Moving", "Working"];

// Transition matrix P (row = from, column = to)
// P[i][j] = probability of transitioning from state i to state j
const P = [
    [0.5, 0.5, 0.0], // From Idle
    [0.2, 0.4, 0.4], // From Moving
    [0.1, 0.0, 0.9], // From Working
];

// Sample next state based on transition probabilities
function sampleNextState(currentState: number): number {
    const probs = P[currentState];
    const rand = Math.random();
    let cumulative = 0;
    for (let i = 0; i < probs.length; i++) {
        cumulative += probs[i];
        if (rand < cumulative) {
            return i;
        }
    }
    return probs.length - 1;
}

// State diagram positions (in SVG coordinates)
const STATE_POSITIONS = [
    { x: 80, y: 200 }, // Idle (left)
    { x: 280, y: 80 }, // Moving (top-right)
    { x: 280, y: 320 }, // Working (bottom-right)
];

const NODE_RADIUS = 45;

// State Diagram SVG Component
const StateDiagram = ({ currentState }: { currentState: number }) => {
    const stateColors = ["#2196f3", "#ff9800", "#4caf50"];

    return (
        <svg width="400" height="400" viewBox="0 0 400 400">
            <defs>
                <marker
                    id="arrowhead"
                    markerWidth="10"
                    markerHeight="7"
                    refX="9"
                    refY="3.5"
                    orient="auto"
                >
                    <polygon points="0 0, 10 3.5, 0 7" fill="#333" />
                </marker>
            </defs>

            {/* Self-loop: Idle (0.5) - left side */}
            <path
                d="M 40 160 A 22 22 0 1 0 40 240"
                fill="none"
                stroke="#333"
                strokeWidth="1.5"
                markerEnd="url(#arrowhead)"
            />
            <text x="20" y="200" textAnchor="middle" fontSize="14" fill="#333">
                0.5
            </text>

            {/* Self-loop: Moving (0.4) - top */}
            <path
                d="M 255 40 A 25 25 0 1 1 305 40"
                fill="none"
                stroke="#333"
                strokeWidth="1.5"
                markerEnd="url(#arrowhead)"
            />
            <text x="280" y="12" textAnchor="middle" fontSize="14" fill="#333">
                0.4
            </text>

            {/* Self-loop: Working (0.9) - bottom right */}
            <path
                d="M 320 295 A 25 25 0 1 1 320 345"
                fill="none"
                stroke="#333"
                strokeWidth="1.5"
                markerEnd="url(#arrowhead)"
            />
            <text x="358" y="320" textAnchor="middle" fontSize="14" fill="#333">
                0.9
            </text>

            {/* Idle -> Moving (0.5) - straight arrow */}
            <line
                x1={80 + NODE_RADIUS * 0.7}
                y1={200 - NODE_RADIUS * 0.7}
                x2={280 - NODE_RADIUS * 0.7}
                y2={80 + NODE_RADIUS * 0.7}
                stroke="#333"
                strokeWidth="1.5"
                markerEnd="url(#arrowhead)"
            />
            <text x="185" y="160" textAnchor="middle" fontSize="14" fill="#333">
                0.5
            </text>

            {/* Moving -> Idle (0.2) - curved arrow */}
            <path
                d={`M ${280 - NODE_RADIUS * 0.85} ${80 + NODE_RADIUS * 0.5}
                    Q 140 100 ${60 + NODE_RADIUS * 0.85} ${180 - NODE_RADIUS * 0.5}`}
                fill="none"
                stroke="#333"
                strokeWidth="1.5"
                markerEnd="url(#arrowhead)"
            />
            <text x="145" y="110" textAnchor="middle" fontSize="14" fill="#333">
                0.2
            </text>

            {/* Moving -> Working (0.4) - straight down */}
            <line
                x1={280}
                y1={80 + NODE_RADIUS}
                x2={280}
                y2={320 - NODE_RADIUS}
                stroke="#333"
                strokeWidth="1.5"
                markerEnd="url(#arrowhead)"
            />
            <text x="295" y="200" textAnchor="start" fontSize="14" fill="#333">
                0.4
            </text>

            {/* Working -> Idle (0.1) - diagonal */}
            <line
                x1={280 - NODE_RADIUS * 0.7}
                y1={320 - NODE_RADIUS * 0.7}
                x2={80 + NODE_RADIUS * 0.7}
                y2={200 + NODE_RADIUS * 0.7}
                stroke="#333"
                strokeWidth="1.5"
                markerEnd="url(#arrowhead)"
            />
            <text x="160" y="285" textAnchor="middle" fontSize="14" fill="#333">
                0.1
            </text>

            {/* State nodes */}
            {STATES.map((state, i) => (
                <g key={state}>
                    <circle
                        cx={STATE_POSITIONS[i].x}
                        cy={STATE_POSITIONS[i].y}
                        r={NODE_RADIUS}
                        fill={stateColors[i] + "40"}
                        stroke={stateColors[i]}
                        strokeWidth="3"
                    />
                    <text
                        x={STATE_POSITIONS[i].x}
                        y={STATE_POSITIONS[i].y}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fontSize="16"
                        fontWeight="bold"
                        fill="#333"
                    >
                        {state}
                    </text>
                </g>
            ))}

            {/* Robot indicator - transparent ring around current state */}
            <circle
                cx={STATE_POSITIONS[currentState].x}
                cy={STATE_POSITIONS[currentState].y}
                r={NODE_RADIUS + 8}
                fill="none"
                stroke="#e91e63"
                strokeWidth="4"
                strokeDasharray="8 4"
            >
                <animate
                    attributeName="stroke-dashoffset"
                    from="0"
                    to="24"
                    dur="1s"
                    repeatCount="indefinite"
                />
            </circle>
        </svg>
    );
};

const MarkovChain = () => {
    const [step, setStep] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    // Speed: 1 = slowest (1000ms), 100 = fastest (instant)
    const [speed, setSpeed] = useState(50);
    const intervalRef = useRef<number | null>(null);
    const rafRef = useRef<number | null>(null);

    // Robot simulation state
    const [currentState, setCurrentState] = useState(0);

    // State visit counts for empirical distribution
    const [visitCounts, setVisitCounts] = useState<number[]>([1, 0, 0]);

    // Advance one step and move robot
    const advanceStep = useCallback(() => {
        setStep((prev) => prev + 1);

        // Sample next state for robot
        setCurrentState((prev) => {
            const nextState = sampleNextState(prev);
            setVisitCounts((counts) => {
                const newCounts = [...counts];
                newCounts[nextState]++;
                return newCounts;
            });
            return nextState;
        });
    }, []);

    // Advance multiple steps at once (for max speed)
    const advanceMultipleSteps = useCallback(
        (numSteps: number) => {
            setStep((prev) => prev + numSteps);

            // Sample states for robot
            setCurrentState((prev) => {
                let state = prev;
                const newCounts = [...visitCounts];
                for (let i = 0; i < numSteps; i++) {
                    state = sampleNextState(state);
                    newCounts[state]++;
                }
                setVisitCounts(newCounts);
                return state;
            });
        },
        [visitCounts]
    );

    // Reset to initial state
    const reset = () => {
        setStep(0);
        setIsRunning(false);
        setCurrentState(0);
        setVisitCounts([1, 0, 0]);
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
        if (rafRef.current) {
            cancelAnimationFrame(rafRef.current);
            rafRef.current = null;
        }
    };

    // Toggle simulation
    const toggleSimulation = () => {
        setIsRunning((prev) => !prev);
    };

    // Handle simulation loop
    useEffect(() => {
        if (isRunning) {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
            if (rafRef.current) {
                cancelAnimationFrame(rafRef.current);
            }

            if (speed >= 100) {
                // Max speed: use requestAnimationFrame for fastest updates
                // Run multiple steps per frame
                const runFast = () => {
                    advanceMultipleSteps(50); // 50 steps per frame
                    rafRef.current = requestAnimationFrame(runFast);
                };
                rafRef.current = requestAnimationFrame(runFast);
            } else {
                // Normal speed: convert speed (1-99) to delay
                // speed 1 = 1000ms, speed 99 = ~10ms
                const delay = Math.max(10, 1000 - speed * 10);
                intervalRef.current = window.setInterval(() => {
                    advanceStep();
                }, delay);
            }
        } else {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
            if (rafRef.current) {
                cancelAnimationFrame(rafRef.current);
                rafRef.current = null;
            }
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
            if (rafRef.current) {
                cancelAnimationFrame(rafRef.current);
            }
        };
    }, [isRunning, speed, advanceStep, advanceMultipleSteps]);

    // Format percentage
    const formatPercent = (value: number) => (value * 100).toFixed(2) + "%";

    // Colors for each state
    const stateColors = ["#2196f3", "#ff9800", "#4caf50"];

    // Calculate empirical distribution
    const totalVisits = visitCounts.reduce((a, b) => a + b, 0);
    const empiricalDist = visitCounts.map((c) => c / totalVisits);

    // Get speed label
    const getSpeedLabel = () => {
        if (speed >= 100) return "Max (instant)";
        const delay = Math.max(10, 1000 - speed * 10);
        return `${delay}ms per step`;
    };

    return (
        <Paper sx={{ padding: 3, borderRadius: 3 }} elevation={3}>
            <Typography
                variant="h6"
                sx={{ marginBottom: 2, fontWeight: "bold" }}
            >
                Markov Chain State Evolution
            </Typography>

            {/* Controls */}
            <Box
                sx={{
                    display: "flex",
                    gap: 2,
                    flexWrap: "wrap",
                    marginBottom: 2,
                }}
            >
                <Button variant="outlined" onClick={reset} color="error">
                    Reset
                </Button>
                <Button
                    variant="contained"
                    onClick={toggleSimulation}
                    color={isRunning ? "warning" : "primary"}
                >
                    {isRunning ? "Pause" : "Run"}
                </Button>
            </Box>

            {/* Speed slider */}
            <Box sx={{ width: 300, marginBottom: 3 }}>
                <Typography gutterBottom>Speed: {getSpeedLabel()}</Typography>
                <Slider
                    value={speed}
                    onChange={(_, newValue) => setSpeed(newValue as number)}
                    min={1}
                    max={100}
                    step={1}
                    valueLabelDisplay="auto"
                    marks={[
                        { value: 1, label: "Slow" },
                        { value: 100, label: "Max" },
                    ]}
                />
            </Box>

            {/* Current step */}
            <Typography variant="body1" sx={{ marginBottom: 2 }}>
                Step k = {step.toLocaleString()}
            </Typography>

            {/* State diagram */}
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    marginBottom: 3,
                    backgroundColor: "#fafafa",
                    borderRadius: 2,
                    padding: 2,
                }}
            >
                <StateDiagram currentState={currentState} />
            </Box>

            {/* Empirical distribution from robot simulation */}
            <Typography
                variant="subtitle1"
                sx={{ fontWeight: "bold", marginBottom: 1 }}
            >
                Empirical Distribution:
            </Typography>
            <Box
                sx={{
                    display: "flex",
                    gap: 3,
                    marginBottom: 3,
                    flexWrap: "wrap",
                }}
            >
                {STATES.map((state, i) => (
                    <Paper
                        key={state}
                        sx={{
                            padding: 2,
                            minWidth: 120,
                            textAlign: "center",
                            backgroundColor: stateColors[i] + "20",
                            border: `2px solid ${stateColors[i]}`,
                        }}
                        elevation={1}
                    >
                        <Typography
                            variant="subtitle2"
                            sx={{ color: stateColors[i], fontWeight: "bold" }}
                        >
                            {state}
                        </Typography>
                        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                            {formatPercent(empiricalDist[i])}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                            ({visitCounts[i].toLocaleString()} visits)
                        </Typography>
                    </Paper>
                ))}
            </Box>
        </Paper>
    );
};

export default MarkovChain;
