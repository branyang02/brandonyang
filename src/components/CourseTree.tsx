import "../styles/CourseTree.css";

import { useEffect, useRef, useState } from "react";
import Tree from "react-d3-tree";

const orgChart = {
    name: "UVA",
    children: [
        {
            name: "Introduction to Programming",
            children: [
                {
                    name: "Computer Systems & Organization I ",
                    children: [
                        {
                            name: "Computer Systems & Organization II",
                        },
                        {
                            name: "Cybersecurity",
                        },
                    ],
                },
                {
                    name: "Software Development Essentials",
                    children: [
                        {
                            name: "Advanced Software Development",
                        },
                    ],
                },
                {
                    name: "Discrete Mathematics",
                    children: [
                        {
                            name: "Theory of Computation",
                        },
                    ],
                },
                {
                    name: "Data Structures",
                    children: [
                        {
                            name: "Algorithms",
                            children: [
                                {
                                    name: "Optimization",
                                },
                                {
                                    name: "Machine Learning",
                                    children: [
                                        {
                                            name: "Natural Language Processing (G)",
                                        },
                                        {
                                            name: "Human Robot Interaction (HRI) (G)",
                                            children: [
                                                {
                                                    name: "Learning for Interactive Robots (G)",
                                                },
                                            ],
                                        },
                                        {
                                            name: "Probabilistic ML (G)",
                                        },
                                        {
                                            name: "Reinforcement Learning (G)",
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
            children: [
                {
                    name: "Linear Algebra",
                    children: [
                        {
                            name: "Probability",
                        },
                    ],
                },
                {
                    name: "Ordinary Differential Equations",
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
