import { Notie } from "notie-markdown";
import { useParams } from "react-router-dom";
import { useDarkMode } from "../context/DarkModeContext";
import { useEffect, useState } from "react";
import { majorScale, Pane, Spinner } from "evergreen-ui";

const NoteModules = import.meta.glob("../assets/notes/*.md", {
    query: "?raw",
    import: "default",
});
const BlogModules = import.meta.glob("../assets/blogs/*.md", {
    query: "?raw",
    import: "default",
});

const NotesBlogs = ({ type }: { type: string }) => {
    const [markdown, setMarkdown] = useState<string>("");
    const [isLoading, setIsLoading] = useState(true);
    const params = useParams();
    const { darkMode } = useDarkMode();
    const contentId = type === "notes" ? params.noteId : params.blogId;

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
                <Notie
                    markdown={markdown}
                    darkMode={darkMode}
                    style={{
                        background: darkMode ? "#333" : "#F9FAFC",
                    }}
                />
            )}
        </Pane>
    );
};

export default NotesBlogs;
