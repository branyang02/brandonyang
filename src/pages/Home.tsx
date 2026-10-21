import { Heading, Pane, majorScale } from "evergreen-ui";
import MarkdownParagraph from "../components/MarkdownParagraph";
import Profile from "../components/Profile";
import { useDarkMode } from "../context/DarkModeContext";
import "../styles/Home.css";
import Experience from "../components/Experience";
import { Helmet } from "react-helmet";
import { countWordsAndEquations, getAllMarkdownString } from "../utils/utils";
import { useEffect, useState } from "react";
import Education from "../components/Education";
import ResearchList from "../components/ResearchList";
import { publications, selectedProjects } from "../data/research";

const Home = () => {
    const { darkMode } = useDarkMode();
    const [wordCount, setWordCount] = useState(0);
    const [equationCount, setEquationCount] = useState(0);
    const [codeLineCount, setCodeLineCount] = useState(0);

    useEffect(() => {
        const fetchCounts = async () => {
            const markdown = await getAllMarkdownString();
            const { wordCount, equationCount, codeLineCount } =
                countWordsAndEquations(markdown);
            setWordCount(wordCount);
            setEquationCount(equationCount);
            setCodeLineCount(codeLineCount);
        };
        fetchCounts();
    }, []);

    const paragraphText = `
        Hi, I’m **Brandon**, an M.S.E. student in Robotics at the [University of Pennsylvania](https://www.grasp.upenn.edu/), graduating in May 2027. I work on **robot learning, VLA models, and the infrastructure that connects demonstrations to robot behavior**.

        I’m currently a research intern at **Honda Research Institute**, studying self-improving autonomous physical AI systems. At Penn’s Perception, Action, & Learning Lab, I work on demonstration retrieval and activation steering for VLA models. Previously, I led research at **AfterQuery** and trained and evaluated robot policies at **Spirit AI**.

        [Resume](/resume/byang_resume.pdf) · [Publications](#publications) · [Selected projects](#selected-projects)

        ${
            wordCount > 0 && equationCount > 0
                ? `I have written [color:#ec4899]${wordCount}[/color] words, [color:#ec4899]${equationCount}[/color] equations, and [color:#ec4899]${codeLineCount}[/color] lines of code on this website in my [blog](/blog) and [notes](/notes).`
                : `I have written [color:#ec4899]a lot of[/color] words, [color:#ec4899]some[/color] equations, and [color:#ec4899]some[/color] lines of code on this website in my [blog](/blog) and [notes](/notes).`
        }
    `;

    const newsParagraphText = `
    10/2026: [UMI-Live](https://branyang02.github.io/umi-live/) brings together our custom handheld hardware, data collection, and robot learning workflow.

    09/2026: Joined Honda Research Institute as a Research Intern in Agentic Autonomous Vehicles.

    08/2025: Moved to Philadelphia to start my M.S.E. in Robotics at UPenn!

    08/2021: Started B.S. in [Computer Science at the University of Virginia](https://engineering.virginia.edu/department/computer-science).
`;

    return (
        <div>
            <Helmet>
                <title>Brandon Y. Yang</title>
                <meta
                    name="description"
                    content="M.S.E. Robotics student at the University of Pennsylvania working on robot learning, reasoning, and Vision-Language-Action models."
                />
            </Helmet>
            <Pane className="home-container">
                <Pane
                    flex={1}
                    marginRight={majorScale(2)}
                    className="home-text"
                >
                    <Heading
                        size={800}
                        marginBottom={majorScale(2)}
                        color={darkMode ? "white" : "default"}
                    >
                        Biography
                    </Heading>
                    <MarkdownParagraph text={paragraphText} />
                    <Heading
                        size={800}
                        marginTop={majorScale(2)}
                        marginBottom={majorScale(2)}
                        color={darkMode ? "white" : "default"}
                    >
                        Education
                    </Heading>
                    <Education />
                    <Heading
                        size={800}
                        marginTop={majorScale(2)}
                        marginBottom={majorScale(2)}
                        color={darkMode ? "white" : "default"}
                    >
                        Experience
                    </Heading>
                    <Experience />
                    <Heading
                        size={800}
                        marginBottom={majorScale(2)}
                        color={darkMode ? "white" : "default"}
                    >
                        News
                    </Heading>
                    <MarkdownParagraph text={newsParagraphText} />
                </Pane>
                <Pane className="profile-container" flexShrink={0}>
                    <Profile />
                </Pane>
            </Pane>
            <section className="research-section" id="publications" aria-labelledby="publications-heading">
                <h2 id="publications-heading">Publications</h2>
                <p className="research-intro">Robot learning, VLA models, and multimodal evaluation.</p>
                <ResearchList entries={publications} />
            </section>
            <section className="research-section" id="selected-projects" aria-labelledby="projects-heading">
                <h2 id="projects-heading">Selected projects</h2>
                <p className="research-intro">Tools for evaluating policies, running robots, and improving inference.</p>
                <ResearchList entries={selectedProjects} />
                <a href="/projects">More projects →</a>
            </section>
        </div>
    );
};

export default Home;
