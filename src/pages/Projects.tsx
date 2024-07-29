import '../styles/Projects.css';
import { Pane, Text, majorScale, minorScale } from 'evergreen-ui';
import { useDarkMode } from '../context/DarkModeContext';

import {
    SiDjango,
    SiExpress,
    SiFastapi,
    SiFlask,
    SiGooglecloud,
    SiHeroku,
    SiJavascript,
    SiMeta,
    SiNvidia,
    SiOpenai,
    SiPython,
    SiPytorch,
    SiReact,
    SiTypescript,
} from '@icons-pack/react-simple-icons';
import React from 'react';

function getLogo(tech: string) {
    switch (tech) {
        case 'React':
            return <SiReact color="#61DAFB" size={24} />;
        case 'TypeScript':
            return <SiTypescript color="#007ACC" size={24} />;
        case 'JavaScript':
            return <SiJavascript color="#F7DF1E" size={24} />;
        case 'Python':
            return <SiPython color="#3776AB" size={24} />;
        case 'Django':
            return <SiDjango color="#092E20" size={24} />;
        case 'OpenAI':
            return <SiOpenai color="#FF0080" size={24} />;
        case 'Google Cloud':
            return <SiGooglecloud color="#4285F4" size={24} />;
        case 'Flask':
            return <SiFlask color="#000000" size={24} />;
        case 'PyTorch':
            return <SiPytorch color="#EE4C2C" size={24} />;
        case 'Heroku':
            return <SiHeroku color="#430098" size={24} />;
        case 'FastAPI':
            return <SiFastapi color="#009688" size={24} />;
        case 'Express':
            return <SiExpress color="#000000" size={24} />;
        case 'Meta':
            return <SiMeta color="#000000" size={24} />;
        case 'LlaMA2':
            return <SiMeta color="#000000" size={24} />;
        case 'Nvidia IsaacGym':
            return <SiNvidia color="#76B900" size={24} />;
        default:
            return null;
    }
}

const Projects = () => {
    const { darkMode } = useDarkMode();

    const projects = [
        {
            image: 'https://branyang02.github.io/images/gloma_diagram.png',
            title: 'GLOMA: Grounded Location for Object Manipulation',
            authors: [
                {
                    name: 'Yifan (Brandon) Yang',
                    link: 'https://www.brandon-yifan-yang.com',
                },
                {
                    name: 'Mohammad Samin Yasar',
                    link: 'https://samin.netlify.app/',
                },
                {
                    name: 'Tariq Iqbal',
                    link: 'https://www.tiqbal.com/',
                },
            ],
            description:
                'GLOMA is a diffusion based text-image editing model for robotic agents to generate goal images for manipulation tasks. GLOMA uses a ViT and LLM to extract corresponding objects from the image based on the text prompt, and then generates a goal image through image diffusion. GitHub',
            link: 'https://branyang02.github.io/images/gloma.png',
            metaLinks: [
                {
                    name: 'GitHub',
                    link: 'https://github.com/branyang02/GLOMA',
                },
            ],
            techStack: [],
        },
        {
            image: 'https://branyang02.github.io/images/franka.gif',
            title: 'Collaborative Centralized Multi-Agent RL',
            description:
                'Multi-Agent Reinforcement Learning (MARL) in IsaacGym for Panda Robots.',
            link: 'https://github.com/branyang02/PandaFactory/tree/main',
            metaLinks: [
                {
                    name: 'GitHub',
                    link: 'https://github.com/branyang02/PandaFactory/',
                },
            ],
            techStack: ['Python', 'PyTorch', 'Nvidia IsaacGym'],
        },
        {
            image: 'https://branyang02.github.io/images/notie.png',
            title: 'Notie',
            description:
                'A markdown note taking app that features live coding, TikZ, and LaTeX support.',
            link: 'https://github.com/branyang02/Notie',
            metaLinks: [
                {
                    name: 'GitHub',
                    link: 'https://github.com/branyang02/Notie',
                },
                {
                    name: 'Live Demo',
                    link: 'https://notie-nine.vercel.app/',
                },
            ],
            techStack: ['TypeScript', 'React', 'Python', 'Flask'],
        },

        {
            image: 'https://branyang02.github.io/images/smart_oh.png',
            title: 'Smart OH (VTHacks)',
            authors: [
                {
                    name: 'Edward Wei',
                    link: 'https://edwardwei.com/',
                },
                {
                    name: 'Brandon Yang',
                    link: 'https://www.brandon-yifan-yang.com',
                },
                {
                    name: 'Ravi Jayaraman',
                    link: 'https://www.linkedin.com/in/ravi-jayaraman-/',
                },
                {
                    name: 'Jack Omohundro',
                    link: 'https://www.linkedin.com/in/jackomohundro/',
                },
            ],
            description:
                'AI powered office hour queue system that streamlines the process of office hours.',
            link: 'https://github.com/ewei2406/SmartOH',
            metaLinks: [
                {
                    name: 'GitHub',
                    link: 'https://github.com/ewei2406/SmartOH',
                },
                {
                    name: 'DevPost',
                    link: 'https://devpost.com/software/smartoh',
                },
            ],
            techStack: [
                'Python',
                'TypeScript',
                'JavaScript',
                'PyTorch',
                'React',
                'Express',
                'FastAPI',
            ],
        },
        {
            image: 'https://branyang02.github.io/images/ai-calendar.png',
            title: 'AI Calendar Maps',
            description:
                'An AI Places Recommendation app that recommends based on your calendar.',
            link: 'https://github.com/branyang02/Django-AI-Calendar-Map',
            metaLinks: [
                {
                    name: 'GitHub',
                    link: 'https://github.com/branyang02/Django-AI-Calendar-Map',
                },
            ],
            techStack: [
                'Python',
                'JavaScript',
                'Django',
                'OpenAI',
                'Google Cloud',
                'Heroku',
            ],
        },
        {
            gif: 'https://branyang02.github.io/images/tetris.gif',
            title: 'Multi-agent Tetris AI',
            description:
                'A Multi-agent Tetris AI trained using Reinforcement Learning.',
            link: 'https://github.com/branyang02/multiagent_tetris',
            metaLinks: [
                {
                    name: 'GitHub',
                    link: 'https://github.com/branyang02/multiagent_tetris',
                },
            ],
            techStack: ['Python', 'PyTorch'],
        },
    ];

    return (
        <Pane className="project-page">
            <Pane display="flex" flexDirection="column" alignItems="center">
                {projects.map((project, index) => (
                    <Pane
                        key={index}
                        width="100%"
                        marginBottom={24}
                        display="flex"
                        flexDirection="row"
                        padding={16}
                        background={darkMode ? '#333' : 'white'}
                        borderRadius={4}
                        color={darkMode ? 'white' : 'black'}
                    >
                        <Pane flex={1} marginRight={16}>
                            {project.image && (
                                <a
                                    href={project.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        style={{
                                            width: '100%',
                                            borderRadius: '4px',
                                        }}
                                    />
                                </a>
                            )}
                            {project.gif && (
                                <a
                                    href={project.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <img
                                        src={project.gif}
                                        alt={project.title}
                                        style={{
                                            width: '100%',
                                            borderRadius: '4px',
                                        }}
                                    />
                                </a>
                            )}
                        </Pane>
                        <Pane flex={2}>
                            {project.link ? (
                                <a
                                    href={project.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{ textDecoration: 'none' }}
                                >
                                    <Text
                                        size={600}
                                        marginTop={minorScale(2)}
                                        color={darkMode ? 'white' : 'black'}
                                        display="block"
                                        fontWeight="bold"
                                    >
                                        {project.title}
                                    </Text>
                                </a>
                            ) : (
                                <Text
                                    size={600}
                                    marginTop={minorScale(2)}
                                    color={darkMode ? 'white' : 'black'}
                                    display="block"
                                    fontWeight="bold"
                                >
                                    {project.title}
                                </Text>
                            )}
                            {project.authors && (
                                <Text
                                    size={400}
                                    marginTop={minorScale(1)}
                                    color={darkMode ? 'white' : 'black'}
                                    display="block"
                                >
                                    {project.authors.map(
                                        (author, authorIndex) => (
                                            <React.Fragment key={authorIndex}>
                                                <a
                                                    href={author.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    style={{
                                                        textDecoration: 'none',
                                                        fontWeight:
                                                            author.name.includes(
                                                                'Brandon',
                                                            )
                                                                ? 'bold'
                                                                : 'normal',
                                                    }}
                                                >
                                                    {author.name}
                                                </a>
                                                {authorIndex <
                                                    project.authors.length -
                                                        1 && ', '}
                                            </React.Fragment>
                                        ),
                                    )}
                                </Text>
                            )}
                            <Text
                                size={400}
                                marginTop={minorScale(2)}
                                color={darkMode ? 'white' : 'black'}
                                display="block"
                            >
                                {project.description}
                            </Text>
                            {project.metaLinks && (
                                <Text
                                    size={400}
                                    marginTop={minorScale(1)}
                                    color={darkMode ? 'white' : 'black'}
                                    display="block"
                                >
                                    {project.metaLinks.map(
                                        (metaLink, metaLinkIndex) => (
                                            <React.Fragment key={metaLinkIndex}>
                                                <a
                                                    href={metaLink.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    style={{
                                                        textDecoration: 'none',
                                                    }}
                                                >
                                                    {metaLink.name}
                                                </a>
                                                {metaLinkIndex <
                                                    project.metaLinks.length -
                                                        1 && ' / '}
                                            </React.Fragment>
                                        ),
                                    )}
                                </Text>
                            )}
                            <Pane
                                display="flex"
                                flexWrap="wrap"
                                marginTop={minorScale(2)}
                            >
                                {project.techStack &&
                                    project.techStack.map((tech, techIndex) => (
                                        <Pane
                                            key={techIndex}
                                            display="flex"
                                            alignItems="center"
                                            marginRight={majorScale(1)}
                                        >
                                            {getLogo(tech)}
                                            <Text
                                                size={300}
                                                marginLeft={minorScale(1)}
                                                color={
                                                    darkMode ? 'white' : 'black'
                                                }
                                            >
                                                {tech}
                                            </Text>
                                        </Pane>
                                    ))}
                            </Pane>
                        </Pane>
                    </Pane>
                ))}
            </Pane>
        </Pane>
    );
};

export default Projects;
