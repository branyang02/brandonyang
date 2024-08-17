import { Notie, NotieConfig, Theme as NotieTheme } from "notie-markdown";
import { useParams } from "react-router-dom";
import { useDarkMode } from "../context/DarkModeContext";
import { useEffect, useState, useMemo } from "react";
import { majorScale, Pane, Spinner } from "evergreen-ui";

const NoteModules = import.meta.glob("../assets/notes/*.md", {
    query: "?raw",
    import: "default",
});
const BlogModules = import.meta.glob("../assets/blogs/*.md", {
    query: "?raw",
    import: "default",
});

function getConfig(contentId: string, darkMode: boolean): NotieConfig {
    const baseTheme: NotieTheme = darkMode
        ? { backgroundColor: "#333" }
        : { backgroundColor: "#F9FAFC" };

    const latexTheme: NotieTheme = {
        fontFamily: '"Computer Modern Serif", serif',
        customFontUrl:
            "https://cdn.jsdelivr.net/gh/bitmaks/cm-web-fonts@latest/fonts.css",
        linkHoverColor: "#0056b3",
    };

    const mergedTheme: NotieTheme =
        contentId === "ml" ? { ...baseTheme, ...latexTheme } : baseTheme;

    return {
        fontSize: contentId === "ml" ? "1.1em" : undefined,
        theme: mergedTheme,
    };
}

const NotesBlogs = ({ type }: { type: string }) => {
    const [markdown, setMarkdown] = useState<string>("");
    const [isLoading, setIsLoading] = useState(true);
    const params = useParams();
    const { darkMode } = useDarkMode();
    const contentId = type === "notes" ? params.noteId : params.blogId;

    const theme = useMemo(
        () => (darkMode ? "default dark" : "default"),
        [darkMode]
    );

    const config = useMemo(
        () => getConfig(contentId as string, darkMode),
        [contentId, darkMode]
    );

    useEffect(() => {
        async function fetchNotes() {
            setIsLoading(true);
            const modules = type === "notes" ? NoteModules : BlogModules;
            for (const path in modules) {
                if (path.includes(contentId as string)) {
                    const markdown = await modules[path]();
                    const rawMDString = markdown as string;
                    setMarkdown(rawMDString);
                    setIsLoading(false);
                    break;
                }
            }
        }

        fetchNotes();
    }, [contentId, type]);

    return (
        <Pane margin="auto" padding={majorScale(3)}>
            {isLoading ? (
                <Pane
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    height={400}
                >
                    <Spinner />
                </Pane>
            ) : (
                <Notie markdown={markdown} theme={theme} config={config} />
            )}
        </Pane>
    );
};

export default NotesBlogs;
