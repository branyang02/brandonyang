import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { ResponsiveChartContainer } from "@mui/x-charts/ResponsiveChartContainer";
import { LinePlot } from "@mui/x-charts/LineChart";
import { ChartsXAxis } from "@mui/x-charts/ChartsXAxis";
import { ScatterPlot } from "@mui/x-charts/ScatterChart";
import { ChartsGrid, ChartsLegend, ChartsYAxis } from "@mui/x-charts";
import { useCallback, useEffect, useState } from "react";
import { Button, Slider } from "@mui/material";

interface ScatterPoint {
    x: number;
    y: number;
    id: number;
}

interface AxisRanges {
    xMin: number;
    xMax: number;
    yMin: number;
    yMax: number;
}

function generateLinearScatterData(n: number): [ScatterPoint[], AxisRanges] {
    const data: ScatterPoint[] = [];
    const slope = Math.random() * 10 - 3; // Random slope between -5 and 5
    const intercept = Math.random() * 20 - 10; // Random intercept between -10 and 10
    const noise = 50; // Noise factor for randomness

    let xMin = Infinity,
        xMax = -Infinity,
        yMin = Infinity,
        yMax = -Infinity;

    for (let i = 0; i < n; i++) {
        const x = i * (20 / n); // Distribute x values evenly between 0 and 20
        const y = slope * x + intercept + (Math.random() * noise - noise / 2);

        data.push({ x, y, id: i + 1 });

        // Update min and max values
        xMin = Math.min(xMin, x);
        xMax = Math.max(xMax, x);
        yMin = Math.min(yMin, y);
        yMax = Math.max(yMax, y);
    }

    // Add a small padding to the ranges
    const padding = 0.1;
    const xPadding = (xMax - xMin) * padding;
    const yPadding = (yMax - yMin) * padding;

    const axisRanges: AxisRanges = {
        xMin: xMin - xPadding,
        xMax: xMax + xPadding,
        yMin: yMin - yPadding,
        yMax: yMax + yPadding,
    };

    return [data, axisRanges];
}

function generateLinearEquation(equation: (x: number) => number) {
    const res = [];
    res.push(equation(-2));
    res.push(equation(20));
    return res;
}

function generateOptimalLinearEquation(data: ScatterPoint[]) {
    const n = data.length;

    let sumX = 0;
    let sumY = 0;
    let sumXY = 0;
    let sumX2 = 0;

    for (const point of data) {
        const { x, y } = point;
        sumX += x;
        sumY += y;
        sumXY += x * y;
        sumX2 += x ** 2;
    }

    const denominator = n * sumX2 - sumX ** 2;

    if (denominator === 0) {
        throw new Error("Denominator is zero. The data may be degenerate.");
    }

    const optM = (n * sumXY - sumX * sumY) / denominator;
    const optB = (sumY - optM * sumX) / n;

    return { optM, optB };
}

function gradientDescentStep(
    data: ScatterPoint[],
    currentM: number,
    currentB: number,
    learningRate: number
) {
    let mGradient = 0;
    let bGradient = 0;
    const n = data.length;

    for (const point of data) {
        const { x, y } = point;
        const prediction = currentM * x + currentB;
        const error = prediction - y;
        mGradient += (2 / n) * error * x;
        bGradient += (2 / n) * error;
    }

    const newM = currentM - learningRate * mGradient;
    const newB = currentB - learningRate * bGradient;

    return { newM, newB };
}

function calcMSE(data: ScatterPoint[], m: number, b: number) {
    const n = data.length;
    let sum = 0;
    for (const point of data) {
        const { x, y } = point;
        const prediction = m * x + b;
        const error = prediction - y;
        sum += error ** 2;
    }

    return sum / n;
}

const LinearRegression = () => {
    const [m, setM] = useState(0);
    const [b, setB] = useState(0);
    const [optM, setOptM] = useState(0);
    const [optB, setOptB] = useState(0);
    const [data, setData] = useState<ScatterPoint[]>([]);
    const [axisRanges, setAxisRanges] = useState<AxisRanges>({
        xMin: -2,
        xMax: 20,
        yMin: -10,
        yMax: 30,
    });
    const [learningRate, setLearningRate] = useState(0.01);
    const [mseValue, setMseValue] = useState(calcMSE(data, m, b));
    const [optPoints, setOptPoints] = useState<number[]>([]);
    const [stepCount, setStepCount] = useState(0);

    const generateNewData = useCallback(() => {
        const [newData, newAxisRanges] = generateLinearScatterData(100);
        setData(newData);
        setAxisRanges(newAxisRanges);
        const { optM, optB } = generateOptimalLinearEquation(newData);
        setOptM(optM);
        setOptB(optB);
        const optimalEquation = (x: number) => optM * x + optB;
        const optPoints = generateLinearEquation(optimalEquation);
        setOptPoints(optPoints);

        setM(0);
        setB(0);
        setMseValue(calcMSE(newData, 0, 0));
        setStepCount(0);
    }, []);

    useEffect(() => {
        generateNewData();
    }, [generateNewData]);

    const stepGradientDescent = async () => {
        let currentM = m;
        let currentB = b;

        const { newM, newB } = gradientDescentStep(
            data,
            currentM,
            currentB,
            learningRate
        );
        currentM = newM;
        currentB = newB;
        setM(newM);
        setB(newB);
        setMseValue(calcMSE(data, newM, newB));
        setStepCount(stepCount + 1);
    };

    const runGradientDescent = async () => {
        const iterations = 1000;

        let currentM = m;
        let currentB = b;

        for (let i = 0; i < iterations; i++) {
            const { newM, newB } = gradientDescentStep(
                data,
                currentM,
                currentB,
                learningRate
            );
            currentM = newM;
            currentB = newB;
        }

        setM(currentM);
        setB(currentB);
        setMseValue(calcMSE(data, currentM, currentB));
        setStepCount(stepCount + iterations);
    };

    const equation = (x: number) => m * x + b;
    const linearPoints = generateLinearEquation(equation);

    return (
        <Paper sx={{ padding: 2, borderRadius: 3 }} elevation={3}>
            <Button
                variant="outlined"
                onClick={generateNewData}
                color="error"
                sx={{ marginRight: 2 }}
            >
                Reset
            </Button>
            <Button
                variant="outlined"
                onClick={stepGradientDescent}
                sx={{ marginRight: 2 }}
            >
                Step Gradient Descent
            </Button>
            <Button variant="outlined" onClick={runGradientDescent}>
                Run 1000 Steps
            </Button>
            <Box sx={{ width: 300, marginY: 2 }}>
                <Slider
                    value={learningRate}
                    onChange={(_, newValue) =>
                        setLearningRate(newValue as number)
                    }
                    aria-labelledby="learning-rate-slider"
                    step={0.001}
                    min={0.001}
                    max={0.1}
                    valueLabelDisplay="auto"
                />
                <Box>Learning Rate: {learningRate}</Box>
                <Box>Step Count: {stepCount}</Box>
            </Box>
            <Paper sx={{ width: "100%", height: 400, borderRadius: 3 }}>
                <ResponsiveChartContainer
                    xAxis={[
                        {
                            label: "x",
                            min: axisRanges.xMin,
                            max: axisRanges.xMax,
                            data: [-2, 20],
                        },
                    ]}
                    yAxis={[
                        {
                            label: "y",
                            min: axisRanges.yMin,
                            max: axisRanges.yMax,
                        },
                    ]}
                    series={[
                        { type: "scatter", data },
                        {
                            type: "line",
                            data: linearPoints,
                            showMark: false,
                            label: `y = ${m.toFixed(10)}x + ${b.toFixed(10)}`,
                        },
                        {
                            type: "line",
                            data: optPoints,
                            showMark: false,
                            label: `optimal = ${optM.toFixed(10)}x + ${optB.toFixed(10)}`,
                        },
                    ]}
                    height={400}
                    margin={{ top: 80, right: 100 }}
                >
                    <ChartsGrid vertical horizontal />
                    <ScatterPlot />
                    <LinePlot />
                    <ChartsXAxis />
                    <ChartsYAxis />
                    <ChartsLegend
                        direction="column"
                        position={{
                            horizontal: "right",
                            vertical: "top",
                        }}
                        slotProps={{
                            legend: {
                                itemMarkHeight: 2,
                                itemMarkWidth: 10,
                            },
                        }}
                    />
                </ResponsiveChartContainer>
            </Paper>
            <Box sx={{ marginTop: 2 }}>Mean Squared Error: {mseValue} </Box>
        </Paper>
    );
};

export default LinearRegression;
