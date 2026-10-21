import type { ProjectVideo } from "../components/ProjectVideos";

export type ResearchEntry = {
    id: string;
    title: string;
    authors?: string;
    venue?: string;
    description: string;
    image?: string;
    videos?: ProjectVideo[];
    imageAlt?: string;
    imageSource?: string;
    caption?: string;
    links: { label: string; href: string }[];
};

// Author order and publication status follow the October 19, 2026 resume.
export const publications: ResearchEntry[] = [
    {
        id: "umi-live",
        title: "UMI-Live for In-The-Wild Bimanual Robotics Data Collection",
        authors: "Govind Velamoor, Adrian Lin, Sam Jung, Spencer Mateega, Brandon Y. Yang†, and Amish Sethi†",
        venue: "CoRL 2026 UMI Arena Workshop · † Equal advising",
        description: "A handheld bimanual system that connects in-the-wild demonstrations to robot learning. Custom grippers combine cameras, LiDAR–inertial sensing, and onboard compute with reconstruction and LeRobot data processing.",
        image: "/research/umi-hardware.png",
        imageAlt: "Exploded UMI-Live gripper showing its camera, LiDAR, Raspberry Pi, battery and fingers",
        imageSource: "https://branyang02.github.io/umi-live/",
        caption: "UMI-Live hardware overview",
        links: [
            { label: "Project & demos", href: "https://branyang02.github.io/umi-live/" },
            { label: "Code", href: "https://github.com/AfterQuery-Research/umi-live" },
            { label: "Hardware", href: "https://branyang02.github.io/umi-live/hardware.html" },
        ],
    },
    {
        id: "ra-vla",
        title: "Retrieval-Augmented Vision-Language-Action Model",
        authors: "Jiani Huang*, Amish Sethi*, Brandon Y. Yang*, Yuchen Zheng, Christopher Watson, Jianing Qian, Mayur Naik, and Dinesh Jayaraman",
        venue: "CoRL 2026 SimBench2Real Workshop · * Equal contribution",
        description: "RA-VLA retrieves a relevant DROID demonstration, adapts its trajectory to the current scene, and overlays it on camera observations to guide a fine-tuned VLA. Evaluated in RoboLab-120 and on real-world manipulation tasks.",
        image: "/research/ravla-method.png",
        imageAlt: "RA-VLA pipeline from scene-graph retrieval through trajectory warping to visual policy guidance",
        caption: "RA-VLA method overview · Figure 1",
        links: [],
    },
    {
        id: "coast",
        title: "Contrastive Conceptor Activation Steering (COAST): Unlocking Vision-Language-Action Models through Hidden States",
        authors: "Miranda Muqing Miao*, Subin Kim*, Brandon Y. Yang*, Dinesh Jayaraman, and Lyle Ungar",
        venue: "ICML 2026 Mechanistic Interpretability Workshop · Accepted poster · ICLR 2027 under review · * Equal contribution",
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
        videos: [
            { label: "MetaWorld", src: "/research/videos/metaworld_drawer_open_success.mp4", poster: "/research/videos/metaworld_drawer_open_success.jpg" },
            { label: "LIBERO", src: "/research/videos/libero_bbq_sauce_success.mp4", poster: "/research/videos/libero_bbq_sauce_success.jpg" },
            { label: "LIBERO-Pro", src: "/research/videos/liberopro_goal_task_drawer_pi05_rollout.mp4", poster: "/research/videos/liberopro_goal_task_drawer_pi05_rollout.jpg" },
            { label: "RoboCasa", src: "/research/videos/robocasa_slide_dishwasher_success.mp4", poster: "/research/videos/robocasa_slide_dishwasher_success.jpg" },
            { label: "RoboLab", src: "/research/videos/robolab_one_bottle_square_pail_success.mp4", poster: "/research/videos/robolab_one_bottle_square_pail_success.jpg" }
        ],
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
        videos: [{ label: "Shoelace tying with dual YAM robots", src: "/research/videos/agentic-robots-shoelace.mp4", poster: "/research/agentic-robots.jpg" }],
        image: "/research/agentic-robots.jpg",
        imageAlt: "Dual YAM robot shoelace-tying demonstration from the agentic-robots project post",
        venue: "Physical AI · Robot control infrastructure",
        description: "An observation/action bridge connecting Codex to dual YAM arms and cameras through MCP. Supports camera feedback, action correction, and recorded rollouts, with hardware checks and operator supervision.",
        links: [{ label: "GitHub", href: "https://github.com/branyang02/agentic-robots" }, { label: "Demo on X", href: "https://x.com/amish_sethi04/status/2102012466758885392" }],
    },
    {
        id: "openpi-cuda",
        title: "openpi-cuda",
        image: "/research/openpi-cuda-benchmark.svg",
        imageAlt: "Mean inference latency on A100 40GB, JAX 92.9 milliseconds, PyTorch 322.0 milliseconds, CUDA 303.5 milliseconds",
        venue: "Inference optimization · C++ / CUDA",
        description: "Custom CUDA kernels for π0.5 inference. On the repo’s A100 40GB benchmark, mean inference time drops from 322.0 ms for the PyTorch baseline to 303.5 ms with CUDA, an 18.5 ms reduction.",
        links: [{ label: "Code & benchmark", href: "https://github.com/branyang02/openpi-cuda" }],
    },
];
