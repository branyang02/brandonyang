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
    const [data, setData] = useState<ScatterPoint[]>([]);
    const [axisRanges, setAxisRanges] = useState<AxisRanges>({
        xMin: -2,
        xMax: 20,
        yMin: -10,
        yMax: 30,
    });
    const [learningRate, setLearningRate] = useState(0.01);
    const [mseValue, setMseValue] = useState(calcMSE(data, m, b));

    const generateNewData = useCallback(() => {
        const [newData, newAxisRanges] = generateLinearScatterData(100);
        setData(newData);
        setAxisRanges(newAxisRanges);

        setM(0);
        setB(0);
        setMseValue(calcMSE(newData, 0, 0));
    }, []);

    useEffect(() => {
        generateNewData();
    }, [generateNewData]);

    const runGradientDescent = async () => {
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
            <Button variant="outlined" onClick={runGradientDescent}>
                Step Gradient Descent
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
            </Box>
            <Paper sx={{ width: "100%", height: 300, borderRadius: 3 }}>
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
                            label: `y = ${m.toFixed(2)}x + ${b.toFixed(2)}`,
                        },
                    ]}
                    height={300}
                    margin={{ top: 10, right: 100 }}
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
