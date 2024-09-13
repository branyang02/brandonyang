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
                <title>coursework | Brandon Yifan Yang</title>
                <meta
                    name="description"
                    content="Relevant coursework taken by Brandon Yifan Yang"
                />
            </Helmet>
            <OrgChartTree />
        </div>
    );
};

export default Courses;
