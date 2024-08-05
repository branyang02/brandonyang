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
            date: `Aug 2024 - Present`,
            title: "[Machine Learning](https://www.cs.virginia.edu/~nn4pj/teaching) (CS 4774) Teaching Assistant",
        },
        {
            date: `May 2024 - Present`,
            title: "Research Assistant at [UMD](https://www.cs.umd.edu/) with [Jia-Bin Huang](https://jbhuang0604.github.io/)",
        },
        {
            date: "Jan 2024 - May 2024",
            title: "[Theory of Computation](https://markfloryan.github.io/dmt2/readme.html) (CS 3120) Teaching Assistant",
        },
        {
            date: "Oct 2023 - Present",
            title: "Co-founder at Voy",
        },
        {
            date: "May 2020 - Present",
            title: "Research Assistant at UVA's [Collaborative Robotics Lab](https://www.collabrobotics.com/)",
        },
        {
            date: "May 2023 - Aug 2023",
            title: "AI/ML Research Intern at [UVA Link Lab](https://engineering.virginia.edu/link-lab)",
        },
        {
            date: "Jan 2023 - May 2023",
            title: "[Computer Systems Organization](https://www.cs.virginia.edu/~jh2jf/courses/cs2130/spring2023/) Lab Lead TA",
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
