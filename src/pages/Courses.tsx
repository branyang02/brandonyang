import "../styles/Courses.css";

import { useEffect } from "react";
import { Helmet } from "react-helmet";

import OrgChartTree from "../components/CourseTree";

const Courses = () => {
    useEffect(() => {
        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = "";
        };
    }, []);
    return (
        <div className="full-padding">
            <Helmet>
                <title>coursework | Brandon Y. Yang</title>
                <meta
                    name="description"
                    content="Relevant coursework taken by Brandon Y. Yang"
                />
            </Helmet>
            <OrgChartTree />
        </div>
    );
};

export default Courses;
