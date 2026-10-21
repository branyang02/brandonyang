import ResearchList from "../components/ResearchList";
import { selectedProjects, type ResearchEntry } from "../data/research";
import { Helmet } from "react-helmet";

export default function Projects() {
    const projects = [
        {
            image: "https://branyang02.github.io/images/notie.png",
            title: "notie-markdown",
            description:
                "A markdown rendering web app with support for equation previewing, graphing, code running, and more. This is what I use to write my blogs and notes on this website.",
            link: "https://notie-markdown.vercel.app/",
            metaLinks: [
                {
                    name: "GitHub",
                    link: "https://github.com/branyang02/notie",
                },
                {
                    name: "Live Demo",
                    link: "https://notie-markdown.vercel.app/",
                },
            ],
            techStack: ["TypeScript", "React", "Python", "Flask"],
        },
        {
            image: "https://branyang02.github.io/images/gloma_diagram.png",
            title: "GLOMA: Grounded Location for Object Manipulation",
            authors: [
                {
                    name: "Brandon Y. Yang",
                    link: "https://www.brandonyifanyang.com",
                },
                {
                    name: "Mohammad Samin Yasar",
                    link: "https://samin.netlify.app/",
                },
                {
                    name: "Tariq Iqbal",
                    link: "https://www.tiqbal.com/",
                },
            ],
            description:
                "A zero-shot image-editing model grounded by language instructions for object relocation and manipulation tasks, designed for downstream robotic applications using goal-conditioned RL and behavioral cloning.",
            link: "https://github.com/branyang02/GLOMA",
            metaLinks: [
                {
                    name: "GitHub",
                    link: "https://github.com/branyang02/GLOMA",
                },
            ],
            techStack: [],
        },
        {
            image: "https://branyang02.github.io/images/franka.gif",
            title: "Centralized Multi-Agent RL for Collaborative Tasks",
            description:
                "Long-horizon on/offline centralized MARL for robotic bolt-screwing tasks in IsaacGym.",
            link: "https://github.com/branyang02/PandaFactory/tree/main",
            metaLinks: [
                {
                    name: "GitHub",
                    link: "https://github.com/branyang02/PandaFactory/",
                },
            ],
            techStack: ["Python", "PyTorch", "Nvidia IsaacGym"],
        },

        {
            gif: "https://branyang02.github.io/images/tetris.gif",
            title: "Multi-agent Tetris AI",
            description:
                "A Multi-agent Tetris AI trained using Reinforcement Learning.",
            link: "https://github.com/branyang02/multiagent_tetris",
            metaLinks: [
                {
                    name: "GitHub",
                    link: "https://github.com/branyang02/multiagent_tetris",
                },
            ],
            techStack: ["Python", "PyTorch"],
        },
    ];
    const allProjects: ResearchEntry[] = [...selectedProjects, ...projects.map((project) => ({
        id: project.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        title: project.title,
        titleHref: project.link,
        description: project.description,
        image: project.image ?? project.gif,
        imageAlt: project.title,
        authors: project.authors?.map((author) => author.name).join(", "),
        venue: project.techStack.join(" · "),
        links: project.metaLinks.map((link) => ({ label: link.name, href: link.link })),
    }))];
    return (
        <div className="project-page" style={{ width: "100%" }}>
            <Helmet><title>Projects | Brandon Y. Yang</title><meta name="description" content="Projects by Brandon Y. Yang." /></Helmet>
            <h1>Projects</h1>
            <ResearchList entries={allProjects} showCaptions={false} />
        </div>
    );
}
