export type ProjectVideo = { label: string; src: string; poster: string };

export default function ProjectVideos({ videos }: { videos: ProjectVideo[] }) {
    return (
        <div className={`project-videos ${videos.length > 1 ? "video-grid" : ""}`}>
            {videos.map((video) => (
                <div key={video.src}>
                    {videos.length > 1 && <div className="video-label">{video.label}</div>}
                    <video src={video.src} poster={video.poster} aria-label={video.label}
                        controls muted loop playsInline preload="metadata"
                        autoPlay={!window.matchMedia("(prefers-reduced-motion: reduce)").matches} />
                </div>
            ))}
        </div>
    );
}
