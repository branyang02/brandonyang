import ProjectVideos from "./ProjectVideos";
import { Fragment } from "react";
import type { ResearchEntry } from "../data/research";
import "../styles/Research.css";

export default function ResearchList({ entries, showCaptions = true }: { entries: ResearchEntry[]; showCaptions?: boolean }) {
    return (
        <div className="research-list">
            {entries.map((entry) => (
                <article className={`research-entry ${entry.image || entry.videos?.length ? "has-figure" : "text-only"}`} data-video-grid={(entry.videos?.length ?? 0) > 1 || undefined} id={entry.id} key={entry.id}>
                    {entry.videos?.length ? <figure>{entry.videoFigureImage && <img className="video-figure-header" src={entry.videoFigureImage} alt={`${entry.title} method overview`} />}<ProjectVideos videos={entry.videos} /></figure> : entry.image && (
                        <figure>
                            <a href={entry.image} target="_blank" rel="noopener noreferrer" aria-label={`View full figure for ${entry.title}`}>
                                <img src={entry.image} alt={entry.imageAlt ?? entry.title} loading="lazy" decoding="async" />
                            </a>
                            {showCaptions && <figcaption>
                                {entry.imageSource ? <a href={entry.imageSource} target="_blank" rel="noopener noreferrer">{entry.caption}</a> : entry.caption}
                            </figcaption>}
                        </figure>
                    )}
                    <div className="research-copy">
                        <h3>{entry.titleHref || entry.links[0]?.href ? <a href={entry.titleHref ?? entry.links[0]?.href} target="_blank" rel="noopener noreferrer">{entry.title}</a> : entry.title}</h3>
                        {entry.authors && <p className="research-authors">{entry.authors.split(/(Brandon Y\. Yang[*†]?)/g).map((part, i) => part.startsWith("Brandon") ? <strong key={i}>{part}</strong> : <Fragment key={i}>{part}</Fragment>)}</p>}
                        {entry.venue && <p className="research-venue">{entry.venue}</p>}
                        {entry.contribution && <p className="research-contribution"><strong>{entry.contribution}</strong></p>}
                        <p>{entry.description}</p>
                        {entry.links.length > 0 && <div className="research-links">{entry.links.map((link) => <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer">{link.label} <span aria-hidden="true">↗</span></a>)}</div>}
                    </div>
                </article>
            ))}
        </div>
    );
}
