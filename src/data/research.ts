import type { ProjectVideo } from "../components/ProjectVideos";

export type ResearchEntry = {
    id: string;
    title: string;
    titleHref?: string;
    authors?: string;
    venue?: string;
    contribution?: string;
    description: string;
    image?: string;
    videos?: ProjectVideo[];
    videoFigureImage?: string;
    imageAlt?: string;
    imageSource?: string;
    caption?: string;
    links: { label: string; href: string }[];
};

// Author order and publication status follow the October 19, 2026 resume.
export const publications: ResearchEntry[] = [
    {
        id: "umi-live",
        videos: [{ label: "UMI-Live teaser", src: "/research/videos/umi-live-teaser.mp4", poster: "/research/videos/umi-live-teaser.jpg" }],
        title: "UMI-Live for In-The-Wild Bimanual Robotics Data Collection",
        authors: "Govind Velamoor, Adrian Lin, Sam Jung, Spencer Mateega, Brandon Y. Yang†, and Amish Sethi†",
        venue: "CoRL 2026 UMI Arena Workshop",
        contribution: "† Equal advising",
        description: "A handheld bimanual system that connects in-the-wild demonstrations to robot learning. Custom grippers combine cameras, LiDAR–inertial sensing, and onboard compute with reconstruction and LeRobot data processing.",
        image: "/research/umi-hardware.png",
        imageAlt: "Exploded UMI-Live gripper showing its camera, LiDAR, Raspberry Pi, battery and fingers",
        imageSource: "https://umi-live.github.io/",
        caption: "UMI-Live hardware overview",
        links: [
            { label: "Project & demos", href: "https://umi-live.github.io/" },
            { label: "arXiv", href: "https://arxiv.org/abs/2610.39385" },
            { label: "PDF", href: "https://arxiv.org/pdf/2610.39385" },
            { label: "Code", href: "https://github.com/AfterQuery-Research/umi-live" },
            { label: "Hardware", href: "https://umi-live.github.io/hardware.html" },
        ],
    },
    {
        id: "ra-vla",
        videos: [{ label: "RA-VLA method overview followed by six real-world rollouts at 10× speed", src: "/research/videos/ravla-teaser.mp4", poster: "/research/videos/ravla-teaser.jpg" }],
        title: "Retrieval-Augmented Vision-Language-Action Model",
        authors: "Jiani Huang*, Amish Sethi*, Brandon Y. Yang*, Yuchen Zheng, Christopher Watson, Jianing Qian, Mayur Naik, and Dinesh Jayaraman",
        venue: "CoRL 2026 SimBench2Real Workshop",
        contribution: "* Equal contribution",
        description: "RA-VLA retrieves a relevant DROID demonstration, adapts its trajectory to the current scene, and overlays it on camera observations to guide a fine-tuned VLA. Evaluated in RoboLab-120 and on real-world manipulation tasks.",
        image: "/research/ravla-method.png",
        imageAlt: "RA-VLA pipeline from scene-graph retrieval through trajectory warping to visual policy guidance",
        caption: "RA-VLA method overview · Figure 1",
        links: [],
    },
    {
        id: "coast",
        videoFigureImage: "/research/coast-overview.png",
        videos: [{ label: "COAST method with MetaWorld, LIBERO, and real-robot footage", src: "/research/videos/coast-rollouts-three-local.mp4", poster: "/research/videos/coast-rollouts-three-local.jpg" }],
        title: "Contrastive Conceptor Activation Steering (COAST): Unlocking Vision-Language-Action Models through Hidden States",
        authors: "Miranda Muqing Miao*, Subin Kim*, Brandon Y. Yang*, Dinesh Jayaraman, and Lyle Ungar",
        venue: "ICML 2026 Mechanistic Interpretability Workshop · ICLR 2027 under review",
        contribution: "* Equal contribution",
        description: "Steering VLA hidden states toward representations associated with successful rollouts. COAST fits conceptors from success and failure examples, then applies them at inference time without updating policy weights.",
        image: "/research/coast-combined.svg",
        imageAlt: "COAST method overview above simulated and real robot evaluation environments from Figure 2",
        imageSource: "https://arxiv.org/abs/2605.17144",
        caption: "COAST method overview",
        links: [
            { label: "Paper", href: "https://arxiv.org/abs/2605.17144" },
            { label: "Workshop", href: "https://mechinterpworkshop.com/posters/" },
        ],
    },
    {
        id: "class",
        videos: [{ label: "CLASS method overview and real robot demonstrations", src: "/research/videos/class-combined.mp4", poster: "/research/videos/class-combined.jpg" }],
        title: "CLASS: Contrastive Learning via Action Sequence Supervision for Robot Manipulation",
        authors: "Sung-Wook Lee, Xuhui Kang, Brandon Y. Yang, and Yen-Ling Kuo",
        venue: "CoRL 2025",
        description: "Learning visual representations from action-sequence similarity to improve robot manipulation under changes in camera pose and object appearance. My work included simulation environments and training visuomotor policies.",
        image: "/research/class-combined.svg",
        imageAlt: "CLASS representation learning overview above real robot Two-Stack, Mug-Hang, and Toaster-Load tasks",
        imageSource: "https://class-robot.github.io/",
        caption: "CLASS representation-learning overview",
        links: [
            { label: "Project", href: "https://class-robot.github.io/" },
            { label: "Paper", href: "https://arxiv.org/abs/2508.01600" },
        ],
    },
    {
        id: "crosssearch",
        videos: [{ label: "CrossSearch: evidence activates an AI agent, followed by a grounded answer and animated rubric checks", src: "/research/videos/crosssearch-agent-rubrics-wide.mp4", poster: "/research/videos/crosssearch-agent-rubrics-wide.jpg" }],
        title: "CrossSearch: Benchmarking Multimodal Agents on Tasks Requiring Both Local Files and Live Web Evidence",
        authors: "Amish Sethi, Peter Jiashu Shen, Aiden Ryou, Brandon Y. Yang, Spencer Mateega, and Sam Jung",
        venue: "Submitted to ACM TheWebConf 2027 · Conference Long Papers",
        description: "A benchmark for multimodal agents working across local files and live web evidence.",
        links: [],
    },
];

export const selectedProjects: ResearchEntry[] = [
    {
        id: "openpi-eval",
        title: "openpi-eval",
        videos: [{ label: "OpenPI evaluation across five robot benchmarks", src: "/research/videos/openpi-eval-collage.mp4", poster: "/research/videos/openpi-eval-collage.jpg" }],
        venue: "Robot policy evaluation · JAX / PyTorch",
        description: "Reproducible OpenPI policy evaluation across MetaWorld, LIBERO, LIBERO-Pro, RoboCasa, and RoboLab. Server-side batching improved policy-server throughput by up to 3.4× in a 64-client LIBERO benchmark.",
        image: "/research/openpi-eval.jpg",
        imageAlt: "OpenPI rollout previews in MetaWorld, LIBERO, RoboCasa and RoboLab",
        imageSource: "https://x.com/brandonyyang02/status/2062678343452135771",
        caption: "Rollout previews from my project post",
        links: [
            { label: "GitHub", href: "https://github.com/branyang02/openpi-eval" },
            { label: "Demo on X", href: "https://x.com/brandonyyang02/status/2062678343452135771" },
            { label: "Dataset", href: "https://huggingface.co/datasets/brandonyang/metaworld_ml45" },
        ],
    },
    {
        id: "agentic-robots",
        title: "agentic-robots",
        videos: [{ label: "Human demonstration transitioning into an inset over the robot and wrist-camera views", src: "/research/videos/agentic-robots-transition.mp4", poster: "/research/videos/agentic-robots-transition.jpg" }],
        image: "/research/agentic-robots.jpg",
        imageAlt: "Dual YAM robot shoelace-tying demonstration from the agentic-robots project post",
        venue: "Physical AI · Robot control infrastructure",
        description: "An observation/action bridge connecting Codex to dual YAM arms and cameras through MCP. Supports camera feedback, action correction, and recorded rollouts, with hardware checks and operator supervision.",
        links: [{ label: "GitHub", href: "https://github.com/branyang02/agentic-robots" }, { label: "Demo on X", href: "https://x.com/amish_sethi04/status/2102012466758885392" }],
    },
    {
        id: "openpi-cuda",
        title: "openpi-cuda",
        image: "/research/openpi-cuda-architecture.svg",
        imageAlt: "Custom CUDA kernels for SigLIP and Gemma, including fused bias GELU, residual LayerNorm, GeGLU, and RMSNorm",
        venue: "Inference optimization · C++ / CUDA",
        description: "Implemented fused activation and normalization kernels in CUDA, with C++ bindings and PyTorch custom-op integration for π0.5’s SigLIP and Gemma layers. Built kernel tests and end-to-end inference benchmarks, measuring an 18.5 ms latency reduction against the PyTorch baseline on A100 40GB.",
        links: [{ label: "Code & benchmark", href: "https://github.com/branyang02/openpi-cuda" }],
    },
];
