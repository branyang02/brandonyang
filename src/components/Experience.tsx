import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineOppositeContent, {
    timelineOppositeContentClasses,
} from "@mui/lab/TimelineOppositeContent";
import MarkdownParagraph from "./MarkdownParagraph";

const Experience = () => {
    const experience = [
        {
            date: "Sep 2026 - Dec 2026",
            title: "**Research Intern, Agentic Autonomous Vehicles · Honda Research Institute USA**\n\nResearching self-improving autonomous physical AI systems with frontier model agents.",
        },
        {
            date: "May 2026 - Aug 2026",
            title: "**Research Lead** · [AfterQuery (YC W25)](https://www.afterquery.com/)\n\nBuilt custom UMI hardware and full-stack software for VLA post-training and evaluation.",
        },
        {
            date: "Aug 2025 - Present",
            title: "**Graduate Research · Penn Perception, Action, & Learning Lab**",
        },
        {
            date: `May 2025 - Aug 2025`,
            title: "**Embodied Intelligence Research Intern** · [Spirit AI](https://www.spirit-ai.com/en/)\n\nVLA training and evaluation in simulation and on real robots; DAgger pipeline development.",
        },
        {
            date: "Aug 2024 - May 2025",
            title: "Research Assistant at UVA's Learning and Interactive Robotics Lab.",
        },
        {
            date: "May 2022 - May 2024",
            title: "Research Assistant at UVA's [Collaborative Robotics Lab](https://www.collabrobotics.com/).",
        },
        {
            date: "May 2023 - Aug 2023",
            title: "AI/ML Research Intern at [UVA Link Lab](https://engineering.virginia.edu/link-lab)",
        },
        {
            date: "Jan 2023 - May 2025",
            title: "TA for [Computer Systems Organization](https://www.cs.virginia.edu/~jh2jf/courses/cs2130/spring2023/), [Theory of Computation](https://markfloryan.github.io/dmt2/readme.html), and [Machine Learning](https://www.cs.virginia.edu/~nn4pj/teaching) at UVA.",
        },
    ];

    return (
        <Timeline
            sx={{
                [`& .${timelineOppositeContentClasses.root}`]: {
                    flex: 0.3,
                },
            }}
        >
            {experience.map((entry, index) => (
                <TimelineItem key={index}>
                    <TimelineOppositeContent>
                        <MarkdownParagraph text={entry.date} />
                    </TimelineOppositeContent>
                    <TimelineSeparator>
                        <TimelineDot />
                        {index < experience.length - 1 && <TimelineConnector />}
                    </TimelineSeparator>
                    <TimelineContent>
                        <MarkdownParagraph text={entry.title} />
                    </TimelineContent>
                </TimelineItem>
            ))}
        </Timeline>
    );
};

export default Experience;
