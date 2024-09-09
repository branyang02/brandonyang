import "../styles/CourseTree.css";

import { useEffect, useRef, useState } from "react";
import Tree from "react-d3-tree";

const orgChart = {
    name: "UVA",
    children: [
        {
            name: "Introduction to Programming",
            attributes: {
                Achievements: "Python goes 🚀🚀🚀",
            },
            children: [
                {
                    name: "Computer Systems & Organization I ",
                    attributes: {
                        Achievement: "Lab Lead TA for Spring '23 🧑‍🏫️",
                    },
                    children: [
                        {
                            name: "Computer Systems & Organization II",
                            attributes: {
                                Achievement: "0.038% away from A+ 💯",
                            },
                        },
                        {
                            name: "Cybersecurity",
                            attributes: {
                                Achievement: "Hashed stuff",
                            },
                        },
                    ],
                },
                {
                    name: "Software Development Essentials",
                    attributes: {
                        Achievement: "Java is cool 👨‍💻. OOP is cool 👨‍💻.",
                    },
                    children: [
                        {
                            name: "Advanced Software Development",
                            attributes: {
                                Achievement:
                                    "Python Django JavaScript HTML 😤😤😤",
                            },
                        },
                    ],
                },
                {
                    name: "Discrete Mathematics",
                    attributes: {
                        Language: "Lean Language 😵‍💫😵‍💫😵‍💫",
                    },
                    children: [
                        {
                            name: "Theory of Computation",
                            attributes: {
                                Achievement:
                                    "Achieved Turing Completeness 🤖🤖🤖",
                                Role: "TA for Spring '24 🧑‍🏫️",
                            },
                        },
                    ],
                },
                {
                    name: "Data Structures",
                    attributes: {
                        Language: "Java",
                    },
                    children: [
                        {
                            name: "Algorithms",
                            attributes: {
                                Language: "Python, Java",
                            },
                            children: [
                                {
                                    name: "Optimization",
                                    attributes: {
                                        Achievement: "KL KL KL KL",
                                    },
                                },
                                {
                                    name: "Machine Learning",
                                    attributes: {
                                        Description:
                                            "SVM, BN, ANN, CNN, RNN + LSTM, LLM, VAE",
                                        Role: "TA for Fall '24 🧑‍🏫️",
                                    },
                                    children: [
                                        {
                                            name: "Natural Language Processing (G)",
                                            attributes: {
                                                Achievement:
                                                    "LLM is cool 🤖🤖🤖",
                                            },
                                        },
                                        {
                                            name: "Human Robot Interaction (HRI) (G)",
                                            attributes: {
                                                Achievement:
                                                    "Robot moves 🚀🚀🚀",
                                            },
                                            children: [
                                                {
                                                    name: "Learning for Interactive Robots (G)",
                                                    attributes: {
                                                        Achievement:
                                                            "Robot learns 🤖🤖🤖",
                                                    },
                                                },
                                            ],
                                        },
                                        {
                                            name: "Probabilistic ML (G)",
                                            attributes: {
                                                Achievement:
                                                    "Bayesian Bayesian BAYESIAN 🦦🦦🦦",
                                            },
                                        },
                                        {
                                            name: "Reinforcement Learning (G)",
                                            attributes: {
                                                Achievement:
                                                    "MDP, DP, Monte-Carlo, TD, Blah Blah Blah 🤖🤖🤖",
                                            },
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
            ],
        },
        {
            name: "Multivariable Calculus",
            attributes: {
                Achievement: "🧮 🧮 🧮",
            },
            children: [
                {
                    name: "Linear Algebra",
                    attributes: {
                        Language: "MATLAB 👎👎👎",
                    },
                    children: [
                        {
                            name: "Probability",
                            attributes: {
                                Achievement:
                                    "Created a Monte Carlo Simulation.",
                            },
                        },
                    ],
                },
                {
                    name: "Ordinary Differential Equations",
                    attributes: {
                        Achievement: "ODEEEE",
                    },
                },
            ],
        },
    ],
};

export default function OrgChartTree() {
    const treeContainerRef = useRef<HTMLDivElement>(null);
    const [translate, setTranslate] = useState({ x: 100, y: 100 });

    useEffect(() => {
        const resizeTree = () => {
            const containerWidth = treeContainerRef.current?.clientWidth;
            const containerHeight = treeContainerRef.current?.clientHeight;

            if (containerWidth && containerHeight) {
                setTranslate({
                    x: containerWidth / 2,
                    y: containerHeight / 50,
                });
            }
        };

        resizeTree();

        window.addEventListener("resize", resizeTree);

        return () => {
            window.removeEventListener("resize", resizeTree);
        };
    }, []);

    return (
        <div
            id="treeWrapper"
            ref={treeContainerRef}
            style={{ width: "100%", height: "100vh" }}
        >
            <Tree
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                data={orgChart}
                rootNodeClassName="node_root"
                branchNodeClassName="node_branch"
                leafNodeClassName="node_leaf"
                orientation="vertical"
                collapsible={false}
                zoomable={true}
                draggable={true}
                centeringTransitionDuration={1000}
                shouldCollapseNeighborNodes={false}
                translate={translate}
                enableLegacyTransitions={true}
                zoom={1}
                hasInteractiveNodes={true}
                nodeSize={{ x: 200, y: 200 }}
                scaleExtent={{ min: 0.1, max: 5 }}
                separation={{ siblings: 3, nonSiblings: 1.5 }}
            />
        </div>
    );
}
