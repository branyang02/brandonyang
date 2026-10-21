import { useState } from "react";

export type ProjectVideo = { label: string; src: string; poster: string };

export default function ProjectVideos({ videos }: { videos: ProjectVideo[] }) {
    const [active, setActive] = useState(0);
    const video = videos[active];
    return (
        <div className="project-videos">
            <video key={video.src} src={video.src} poster={video.poster} aria-label={video.label}
                controls muted loop playsInline preload="metadata"
                autoPlay={!window.matchMedia("(prefers-reduced-motion: reduce)").matches} />
            {videos.length > 1 && <div className="video-choices" aria-label="Choose rollout demo">
                {videos.map((item, index) => <button key={item.src} type="button" aria-pressed={index === active}
                    onClick={() => setActive(index)}>{item.label}</button>)}
            </div>}
        </div>
    );
}
