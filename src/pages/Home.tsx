import { Heading, Pane, majorScale } from "evergreen-ui";
import MarkdownParagraph from "../components/MarkdownParagraph";
import Profile from "../components/Profile";
import { useDarkMode } from "../context/DarkModeContext";
import "../styles/Home.css";
import Experience from "../components/Experience";
import { Helmet } from "react-helmet";
import { countWordsAndEquations, getMarkdown } from "../utils/utils";
import { useEffect, useState } from "react";

const Home = () => {
    const { darkMode } = useDarkMode();
    const [wordCount, setWordCount] = useState(0);
    const [equationCount, setEquationCount] = useState(0);
    const [codeLineCount, setCodeLineCount] = useState(0);

    useEffect(() => {
        const fetchCounts = async () => {
            const markdown = await getMarkdown();
            const { wordCount, equationCount, codeLineCount } =
                countWordsAndEquations(markdown);
            setWordCount(wordCount);
            setEquationCount(equationCount);
            setCodeLineCount(codeLineCount);
        };
        fetchCounts();
    }, []);

    const paragraphText = `
        I am a fourth-year B.S. Computer Science student at the [University of Virginia](https://engineering.virginia.edu/).
        I am interested in the intersection of Machine Learning (ML), Computer Vision, and Robotics. My current research focuses on
        improving robotic reasoning and manipulation using Language and Vision models. 
        I have worked with [Tariq Iqbal](https://www.tiqbal.com/) at the [Collaborative Robotics Lab](https://www.collabrobotics.com/), and 
        I am advised by [Yen-Ling Kuo](https://yenlingkuo.com/) for my undergraduate thesis. 
        I am also affiliated with [Jia-Bin Huang](https://jbhuang0604.github.io/) at University of Maryland, College Park. 
        I am applying to graduate programs in Computer Science and Robotics for Fall 2025.

        ${
            wordCount > 0 && equationCount > 0
                ? `I have written [color:#ec4899]${wordCount}[/color] words, [color:#ec4899]${equationCount}[/color] equations, and [color:#ec4899]${codeLineCount}[/color] lines of code on this website in my [blog](/blog) and [notes](/notes).`
                : `I have written [color:#ec4899]a lot of[/color] words, [color:#ec4899]some[/color] equations, and [color:#ec4899]some[/color] lines of code on this website in my [blog](/blog) and [notes](/notes).`
        }
    `;

    const newsParagraphText = `
    10/2024: Presented my latest work on [SkillVLA](/skillvla.pdf) at [UVA LLM Workshop 2024](https://uvanlp.org/llm-workshop-2024/) (Received Audience's Choice Award)!

    08/2024: Excited to start my Senior Capstone with [Yen-Ling Kuo](https://yenlingkuo.com/) at UVA!

    08/2024: Started working as a TA for CS 4774: Machine Learning with [Prof. Rich Nguyen](https://www.cs.virginia.edu/~nn4pj/) at UVA!

    05/2024: Started working with [Jia-Bin Huang](https://jbhuang0604.github.io/) at University of Maryland, College Park!

    01/2024: Started working as a TA for [CS 3120: Theory of Computation](https://markfloryan.github.io/dmt2/readme.html) at UVA!

    11/2023: Voy received $1,000 in funding from winning UVA's [Entrepreneurship Cup](https://www.darden.virginia.edu/sites/default/files/inline-files/UVA%20ECup%20Finalists%202023-24_v2.pdf)!

    11/2023: Presented [GLOMA](https://github.com/branyang02/GLOMA) at UVA's Fall Research Expo!

    10/2023: Co-founded Voy, a startup that's building a platform for non-profit organizations to manage their volunteers.

    09/2023: Invited to present [GLOMA](https://github.com/branyang02/GLOMA) at UVA's [Thornton Society](https://engineering.virginia.edu/alumni/thornton-society) Dinner!

    09/2023: Received 3rd place overall at VTHacks 11 for building [Smart OH](https://devpost.com/software/smartoh), a smart office hour queue system with AI and NLP integration!

    07/2023: Presented poster [GLOMA](https://github.com/branyang02/GLOMA): Grounded Location for Object Manipulation at UVA's Summer Research Symposium!

    06/2023: Started working at UVA [Link Lab](https://engineering.virginia.edu/labs-groups/link-lab) with support from UVA Engineering Undergraduate Research Program!

    03/2023: Accepted to UVA Dean's Engineering Undergraduate Research Program for Summer 2023!

    01/2023: Started working as a Lab Lead TA for [CS 2130: Computer Systems & Organizations](https://www.cs.virginia.edu/~jh2jf/courses/cs2130/spring2023/) at UVA!

    11/2022: Demoed robot grasping system using Fetch Robot and AprilTag at UVA Engineering Open House.

    07/2022: Invited to work with high school students as part of [UVA Advance program](https://summer.virginia.edu/uva-advance). Developed room mapping navigation system with Double Robot using Python and ROS.

    06/2022: Started working as a Research Assistant at UVA's [Collaborative Robotics Lab](https://www.collabrobotics.com/)!

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
                <Pane flex={1} marginRight={majorScale(2)}>
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
