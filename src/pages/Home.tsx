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
        Hi! I am **Brandon**, a Robotics Masters student at the [University of Pennsylvania](https://www.grasp.upenn.edu/). I work on **Robot Learning and Reasoning**, specifically using **V**ision-**L**anguage-**A**ction (VLA) Models to enable robots to perform complex tasks!

        ${
            wordCount > 0 && equationCount > 0
                ? `I have written [color:#ec4899]${wordCount}[/color] words, [color:#ec4899]${equationCount}[/color] equations, and [color:#ec4899]${codeLineCount}[/color] lines of code on this website in my [blog](/blog) and [notes](/notes).`
                : `I have written [color:#ec4899]a lot of[/color] words, [color:#ec4899]some[/color] equations, and [color:#ec4899]some[/color] lines of code on this website in my [blog](/blog) and [notes](/notes).`
        }
    `;

    const newsParagraphText = `
    08/2025: Moved to Philadelphia to start my M.S.E. in Robotics at UPenn!

    08/2021: Started B.S. in [Computer Science at the University of Virginia](https://engineering.virginia.edu/department/computer-science).
`;

    return (
        <div>
            <Helmet>
                <title>Brandon Y. Yang</title>
                <meta
                    name="description"
                    content="Fourth-year B.S. Computer Science student at UVA, advised by Yen-Ling Kuo. Applying to graduate programs in CS and Robotics for Fall 2025."
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
        </div>
    );
};

export default Home;
