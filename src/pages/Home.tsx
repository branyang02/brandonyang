import { Heading, Pane, majorScale } from 'evergreen-ui';
import MarkdownParagraph from '../components/MarkdownParagraph';
import Profile from '../components/Profile';
import { useDarkMode } from '../context/DarkModeContext';
import '../styles/Home.css'; // Import the CSS file
import Experience from '../components/Experience';

const Home = () => {
    const { darkMode } = useDarkMode();
    const paragraphText = `
        I am a fourth-year B.S. Computer Science student at the [University of Virginia](https://engineering.virginia.edu/).
        I am interested in Machine Learning (ML), Reinforcement Learning (RL), Computer Vision, Robotics, and Software Development.
        I am currently working as a research assistant with [Professor Iqbal](https://engineering.virginia.edu/faculty/tariq-iqbal)
        at the [Collaborative Robotics Lab](https://www.collabrobotics.com/) at UVA. I am particularly interested in applying ML and RL to
        robotics applications, as well as building software applications using AI components such as LLM. I am also interested in the
        intersection between ML and Computer Vision, and I am currently working on a project that uses LLM and Diffusion Models to
        generate goal images for Imitation and Reinforcement Learning.
    `;

    const newsParagraphText = `
    03/2024: Accepted to UVA's Master of Science in Computer Science program!

    01/2024: Started working as a TA for CS 3120: Theory of Computation at UVA!

    11/2023: Voy received $1,000 in funding from winning UVA's Entrepreneurship Cup!

    11/2023: Presented GLOMA at UVA's Fall Research Expo!

    10/2023: Co-founded Voy, a startup that's building a platform for non-profit organizations to manage their volunteers.

    09/2023: Invited to present GLOMA at UVA's Thornton Society Dinner!

    09/2023: Received 3rd place overall at VTHacks 11 for building Smart OH, a smart office hour queue system with AI and NLP integration!

    07/2023: Presented poster GLOMA: Grounded Location for Object Manipulation at UVA's Summer Research Symposium!

    06/2023: Started working at UVA Link Lab with support from UVA Engineering Undergraduate Research Program!

    03/2023: Accepted to UVA Dean's Engineering Undergraduate Research Program for Summer 2023!

    01/2023: Started working as a Lab Lead TA for CS 2130: Computer Systems & Organizations at UVA!

    11/2022: Demoed robot grasping system using Fetch Robot and AprilTag at UVA Engineering Open House.

    09/2022: Developed object localization tool for Panda Robot using AprilTag, ROS, and OpenCV.

    07/2022: Invited to work with high schooler as part of UVA Advance program. Developed room mapping navigation system with Double Robot using Python and ROS.

    06/2022: Started working as a Research Assistant at UVA's Collaborative Robotics Lab!

    08/2021: Started B.S. in Computer Science at the University of Virginia.
`;

    return (
        <Pane className="home-container">
            <Pane flex={1} marginRight={majorScale(2)}>
                <Heading
                    size={800}
                    marginBottom={majorScale(2)}
                    color={darkMode ? 'white' : 'default'}
                >
                    Biography
                </Heading>
                <MarkdownParagraph text={paragraphText} />
                <Heading
                    size={800}
                    marginTop={majorScale(2)}
                    marginBottom={majorScale(2)}
                    color={darkMode ? 'white' : 'default'}
                >
                    Experience
                </Heading>
                <Experience />
                <Heading
                    size={800}
                    marginBottom={majorScale(2)}
                    color={darkMode ? 'white' : 'default'}
                >
                    News
                </Heading>
                <MarkdownParagraph text={newsParagraphText} />
            </Pane>
            <Pane className="profile-container" flexShrink={0}>
                <Profile />
            </Pane>
        </Pane>
    );
};

export default Home;
