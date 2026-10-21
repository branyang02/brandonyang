import { Helmet } from "react-helmet";
import ResearchList from "../components/ResearchList";
import { publications } from "../data/research";

export default function Publications() {
    return (
        <div className="project-page" style={{ width: "100%" }}>
            <Helmet>
                <title>Publications | Brandon Y. Yang</title>
                <meta name="description" content="Research publications by Brandon Y. Yang on robot learning, VLA models, and multimodal evaluation." />
            </Helmet>
            <h1>Publications</h1>
            <p className="research-intro">Robot learning, VLA models, and multimodal evaluation.</p>
            <ResearchList entries={publications} showCaptions={false} />
        </div>
    );
}
