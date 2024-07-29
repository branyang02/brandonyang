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

    return (
        <Pane className="home-container">
            <Pane flex={1} marginRight={majorScale(2)}>
                <Heading
                    size={700}
                    marginBottom={majorScale(2)}
                    color={darkMode ? 'white' : 'default'}
                >
                    Biography
                </Heading>
                <MarkdownParagraph text={paragraphText} />
                <Heading
                    size={700}
                    marginTop={majorScale(2)}
                    marginBottom={majorScale(2)}
                    color={darkMode ? 'white' : 'default'}
                >
                    Experience
                </Heading>
                <Pane>
                    <Experience />
                </Pane>
            </Pane>
            <Pane className="profile-container" flexShrink={0}>
                <Profile />
            </Pane>
        </Pane>
    );
};

export default Home;
