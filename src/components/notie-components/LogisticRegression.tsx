import { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import { ResponsiveChartContainer } from "@mui/x-charts/ResponsiveChartContainer";
import { ScatterPlot } from "@mui/x-charts/ScatterChart";
import {
    ChartsXAxis,
    ChartsYAxis,
    ChartsGrid,
    ChartsLegend,
    LinePlot,
} from "@mui/x-charts";
import { Box, Button, Slider } from "@mui/material";

interface DataPoint {
    x: number; // Feature 1
    y: number; // Feature 2
    label: number; // Label (0 or 1)
    id: number; // Unique identifier
}

function generateData(m: number, noiseFraction: number = 0.2): DataPoint[] {
    const data: DataPoint[] = [];

    // Generate random features in 2D plane (-1 to 1 range)
    for (let i = 0; i < m; i++) {
        const x = Math.random() * 2 - 1; // Random number between -1 and 1
        const y = Math.random() * 2 - 1; // Random number between -1 and 1
        data.push({ x, y, label: 0, id: i });
    }

    // Assign labels based on the sum of x and y
    data.forEach((point) => {
        point.label = point.x + point.y > 0 ? 1 : 0;
    });

    // Introduce noise by flipping labels
    const numNoisyPoints = Math.floor(noiseFraction * m);
    const flipIndices = new Set<number>();
    while (flipIndices.size < numNoisyPoints) {
        flipIndices.add(Math.floor(Math.random() * m));
    }
    flipIndices.forEach((index) => {
        data[index].label = 1 - data[index].label; // Flip the label
    });

    return data;
}

function sigmoid(z: number): number {
    return 1 / (1 + Math.exp(-z));
}

function computeLogLoss(
    data: DataPoint[],
    weights: { w1: number; w2: number },
    bias: number
): number {
    const m = data.length;
    let totalLoss = 0;

    data.forEach((point) => {
        const z = weights.w1 * point.x + weights.w2 * point.y + bias;
        const prediction = sigmoid(z);
        const y = point.label;

        // Avoid log(0) by adding a small epsilon
        const epsilon = 1e-15;
        totalLoss += -(
            y * Math.log(prediction + epsilon) +
            (1 - y) * Math.log(1 - prediction + epsilon)
        );
    });

    return totalLoss / m;
}

function gradientDescentStep(
    data: DataPoint[],
    weights: { w1: number; w2: number },
    bias: number,
    learningRate: number
): { newWeights: { w1: number; w2: number }; newBias: number } {
    const m = data.length;
    let w1Gradient = 0;
    let w2Gradient = 0;
    let biasGradient = 0;

    data.forEach((point) => {
        const z = weights.w1 * point.x + weights.w2 * point.y + bias;
        const prediction = sigmoid(z);
        const error = prediction - point.label;

        w1Gradient += (1 / m) * error * point.x;
        w2Gradient += (1 / m) * error * point.y;
        biasGradient += (1 / m) * error;
    });

    const newWeights = {
        w1: weights.w1 - learningRate * w1Gradient,
        w2: weights.w2 - learningRate * w2Gradient,
    };
    const newBias = bias - learningRate * biasGradient;

    return { newWeights, newBias };
}

function generateDecisionBoundary(
    weights: { w1: number; w2: number },
    bias: number,
    xRange: [number, number]
): number[] {
    const { w1, w2 } = weights;

    const [xMin, xMax] = xRange;
    const points = [];

    const yAtXMin = -(w1 * xMin + bias) / w2;
    const yAtXMax = -(w1 * xMax + bias) / w2;

    points.push(yAtXMin);
    points.push(yAtXMax);

    return points;
}

const LogisticRegression = () => {
    const [data, setData] = useState<DataPoint[]>([]);
    const [weights, setWeights] = useState({ w1: 0, w2: 0 });
    const [bias, setBias] = useState(0);
    const [learningRate, setLearningRate] = useState(0.1);
    const [loss, setLoss] = useState(0);
    const [stepCount, setStepCount] = useState(0);
    const [decisionBoundary, setDecisionBoundary] = useState<number[]>([]);

    const generateNewData = () => {
        const generatedData = generateData(100, 0.1);
        setData(generatedData);
        setWeights({ w1: 0, w2: 0 });
        setBias(0);
        setLoss(computeLogLoss(generatedData, { w1: 0, w2: 0 }, 0));
        setStepCount(0);
        setDecisionBoundary([
            Math.random() * 2.2 - 1.1,
            Math.random() * 2.2 - 1.1,
        ]);
    };

    useEffect(() => {
        generateNewData();
    }, []);

    // Separate data points by label for coloring
    const dataClass0 = data.filter((point) => point.label === 0);
    const dataClass1 = data.filter((point) => point.label === 1);

    const trainStep = () => {
        const { newWeights, newBias } = gradientDescentStep(
            data,
            weights,
            bias,
            learningRate
        );
        setWeights(newWeights);
        setBias(newBias);
        const currentLoss = computeLogLoss(data, newWeights, newBias);
        setLoss(currentLoss);
        setStepCount(stepCount + 1);
        setDecisionBoundary(
            generateDecisionBoundary(newWeights, newBias, [-1.1, 1.1])
        );
    };

    const trainMultipleSteps = (iterations: number) => {
        let currentWeights = { ...weights };
        let currentBias = bias;

        for (let i = 0; i < iterations; i++) {
            const { newWeights, newBias } = gradientDescentStep(
                data,
                currentWeights,
                currentBias,
                learningRate
            );
            currentWeights = newWeights;
            currentBias = newBias;
        }
        setWeights(currentWeights);
        setBias(currentBias);
        const currentLoss = computeLogLoss(data, currentWeights, currentBias);
        setLoss(currentLoss);
        setStepCount(stepCount + iterations);
        setDecisionBoundary(
            generateDecisionBoundary(currentWeights, currentBias, [-1.1, 1.1])
        );
    };

    return (
        <Paper sx={{ padding: 2, borderRadius: 3 }} elevation={3}>
            <Box sx={{ marginBottom: 2, fontSize: 18, fontWeight: "bold" }}>
                Logistic Regression Visualization
            </Box>
            <Button
                variant="outlined"
                onClick={generateNewData}
                color="error"
                sx={{
                    marginRight: 2,
                }}
            >
                Reset
            </Button>
            <Button
                variant="outlined"
                onClick={trainStep}
                sx={{ marginRight: 2 }}
            >
                Step Gradient Descent
            </Button>
            <Button
                variant="outlined"
                onClick={() => trainMultipleSteps(100)}
                sx={{ marginRight: 2 }}
            >
                Run 100 Steps
            </Button>
            <Box sx={{ width: 300, marginY: 2 }}>
                <Slider
                    value={learningRate}
                    onChange={(_, newValue) =>
                        setLearningRate(newValue as number)
                    }
                    aria-labelledby="learning-rate-slider"
                    step={0.01}
                    min={0.01}
                    max={1}
                    valueLabelDisplay="auto"
                />
                <Box>Learning Rate: {learningRate.toFixed(2)}</Box>
                <Box>Step Count: {stepCount}</Box>
                <Box>Loss: {loss.toFixed(4)}</Box>
            </Box>
            <ResponsiveChartContainer
                xAxis={[
                    {
                        label: "x",
                        min: -1.1,
                        max: 1.1,
                        data: [-1.1, 1.1],
                    },
                ]}
                yAxis={[
                    {
                        label: "y",
                        min: -1.1,
                        max: 1.1,
                    },
                ]}
                series={[
                    {
                        type: "scatter",
                        data: dataClass0,
                        label: "Class 0",
                        color: "blue",
                    },
                    {
                        type: "scatter",
                        data: dataClass1,
                        label: "Class 1",
                        color: "red",
                    },
                    {
                        type: "line",
                        data: decisionBoundary,
                        showMark: true,
                        label: "Decision Boundary",
                        color: "purple",
                    },
                ]}
                height={500}
            >
                <ChartsGrid />
                <ScatterPlot />
                <LinePlot />
                <ChartsXAxis />
                <ChartsYAxis />
                <ChartsLegend
                    position={{ horizontal: "right", vertical: "top" }}
                    direction="column"
                />
            </ResponsiveChartContainer>
        </Paper>
    );
};

export default LogisticRegression;
