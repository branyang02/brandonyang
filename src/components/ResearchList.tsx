import { Fragment } from "react";
import type { ResearchEntry } from "../data/research";
import "../styles/Research.css";

export default function ResearchList({ entries, showCaptions = true }: { entries: ResearchEntry[]; showCaptions?: boolean }) {
    return (
        <div className="research-list">
            {entries.map((entry) => (
                <article className={`research-entry ${entry.image ? "has-figure" : "text-only"}`} id={entry.id} key={entry.id}>
                    {entry.image && (
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
                        <h3>{entry.title}</h3>
                        {entry.authors && <p className="research-authors">{entry.authors.split(/(Brandon Y\. Yang[*†]?)/g).map((part, i) => part.startsWith("Brandon") ? <strong key={i}>{part}</strong> : <Fragment key={i}>{part}</Fragment>)}</p>}
                        {entry.venue && <p className="research-venue">{entry.venue}</p>}
                        <p>{entry.description}</p>
                        {entry.links.length > 0 && <div className="research-links">{entry.links.map((link) => <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer">{link.label} <span aria-hidden="true">↗</span></a>)}</div>}
                    </div>
                </article>
            ))}
        </div>
    );
}
