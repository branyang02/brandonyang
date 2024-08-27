import { Notie, NotieConfig, Theme as NotieTheme } from "notie-markdown";
import { useParams } from "react-router-dom";
import { useDarkMode } from "../context/DarkModeContext";
import {
    useEffect,
    useState,
    useMemo,
    useCallback,
    useLayoutEffect,
} from "react";
import { majorScale, Pane, Spinner } from "evergreen-ui";
import LinearRegression from "../components/notie-components/LinearRegression";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
    palette: {
        mode: "dark",
    },
});

const lightTheme = createTheme({
    palette: {
        mode: "light",
    },
});

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
        blockquoteStyle: "latex",
        numberedHeading: true,
        tocMarker: false,
    };

    const mergedTheme: NotieTheme =
        contentId === "ml" || contentId === "ode"
            ? { ...baseTheme, ...latexTheme }
            : baseTheme;

    return {
        fontSize:
            contentId === "ml" || contentId === "ode" ? "1.05em" : undefined,
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

    const customComponents = useMemo(
        () => ({
            linearRegression: () => <LinearRegression />,
        }),
        []
    );

    const scrollPositionKey = `scrollPosition-${contentId}`;

    const restoreScrollPosition = useCallback(() => {
        const savedPosition = localStorage.getItem(scrollPositionKey);
        if (savedPosition) {
            console.log("Restoring scroll position", savedPosition);
            const originalBehavior =
                document.documentElement.style.scrollBehavior;
            document.documentElement.style.scrollBehavior = "auto";
            window.scrollTo(0, parseInt(savedPosition, 10));
            document.documentElement.style.scrollBehavior = originalBehavior;
        }
    }, [scrollPositionKey]);

    const saveScrollPosition = useCallback(() => {
        const currentScrollY = window.scrollY;
        if (currentScrollY !== 0) {
            console.log("Saving scroll position", currentScrollY);
            localStorage.setItem(scrollPositionKey, currentScrollY.toString());
        } else {
            restoreScrollPosition();
        }
    }, [restoreScrollPosition, scrollPositionKey]);

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

    useLayoutEffect(() => {
        // Restore scroll position after content has been rendered
        restoreScrollPosition();
    }, [markdown, restoreScrollPosition]);

    useEffect(() => {
        // Save scroll position on scroll
        window.addEventListener("scroll", saveScrollPosition);
        return () => window.removeEventListener("scroll", saveScrollPosition);
    }, [saveScrollPosition]);

    return (
        <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
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
                        theme={theme}
                        config={config}
                        customComponents={customComponents}
                    />
                )}
            </Pane>
        </ThemeProvider>
    );
};

export default NotesBlogs;
