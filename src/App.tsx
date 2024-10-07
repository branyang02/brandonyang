import "./styles/App.css";
import { Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import NotieLayout from "./layouts/NotieLayout";
import Projects from "./pages/Projects";
import Home from "./pages/Home";
import NoteBlogCards from "./pages/NoteBlogCards";
import NotesBlogs from "./pages/NoteBlog";
import Courses from "./pages/Courses";
import { SpeedInsights } from "@vercel/speed-insights/react";

const App = () => {
    const routes = [
        { path: "/", Layout: MainLayout, Component: Home },
        { path: "/projects", Layout: MainLayout, Component: Projects },
        { path: "/coursework", Layout: MainLayout, Component: Courses },
        {
            path: "/blog",
            Layout: NotieLayout,
            Component: NoteBlogCards,
            props: { type: "blog" },
        },
        {
            path: "/notes",
            Layout: NotieLayout,
            Component: NoteBlogCards,
            props: { type: "notes" },
        },
        {
            path: "/notes/:noteId",
            Layout: NotieLayout,
            Component: NotesBlogs,
            props: { type: "notes" },
        },
        {
            path: "/blog/:blogId",
            Layout: NotieLayout,
            Component: NotesBlogs,
            props: { type: "blog" },
        },
    ];

    return (
        <>
            <Routes>
                {routes.map(({ path, Layout, Component, props }) => (
                    <Route
                        key={path}
                        path={path}
                        element={
                            <Layout>
                                {props ? (
                                    <Component {...props} />
                                ) : (
                                    <Component />
                                )}
                            </Layout>
                        }
                    />
                ))}
            </Routes>
            <SpeedInsights />
        </>
    );
};

export default App;
