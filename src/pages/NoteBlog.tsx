import { Notie, NotieConfig, Theme as NotieTheme } from "notie-markdown";
import { useParams } from "react-router-dom";
import { useDarkMode } from "../context/DarkModeContext";
import { useEffect, useState, useMemo } from "react";
import { majorScale, Pane, Spinner } from "evergreen-ui";
import LinearRegression from "../components/notie-components/LinearRegression";
import LogisticRegression from "../components/notie-components/LogisticRegression";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Helmet } from "react-helmet";
import Giscus from "@giscus/react";
import LastUpdated from "../components/LastUpdated";
import { loadMarkdownModules } from "../utils/utils";

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

const latexThemeContentIDs = ["ml", "ode", "flow-matching"];

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

    const mergedTheme: NotieTheme = latexThemeContentIDs.includes(contentId)
        ? { ...baseTheme, ...latexTheme }
        : baseTheme;

    return {
        fontSize: latexThemeContentIDs.includes(contentId)
            ? "1.05em"
            : undefined,
        theme: mergedTheme,
    };
}

const NotesBlogs = ({ type }: { type: string }) => {
    const [markdown, setMarkdown] = useState<string>("");
    const [isLoading, setIsLoading] = useState(true);
    const params = useParams();
    const { darkMode } = useDarkMode();
    const contentId = type === "notes" ? params.noteId : params.blogId;

    const modules = useMemo(() => loadMarkdownModules(), []);

    useEffect(() => {
        const path = `../assets/${type}/${contentId}.md`;
        const matchedModule = Object.keys(modules).find((key) =>
            key.includes(path)
        );
        async function fetchNotes() {
            if (!matchedModule) return;
            const markdown = await modules[matchedModule]();
            setMarkdown(markdown as string);
            setIsLoading(false);
        }

        fetchNotes();
    }, [contentId, modules, type]);

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
            logisticRegression: () => <LogisticRegression />,
            LastUpdated: () => <LastUpdated />,
        }),
        []
    );

    return (
        <div>
            <Helmet>
                <title>{contentId} | Brandon Y. Yang</title>
                <meta
                    name="description"
                    content={`Notes and blog on ${contentId} by Brandon Y. Yang`}
                />
            </Helmet>
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
                    <Giscus
                        id="comments"
                        repo="branyang02/brandonyang"
                        repoId="R_kgDOMct0sA"
                        category="General"
                        categoryId="DIC_kwDOMct0sM4Ci70X"
                        mapping="pathname"
                        strict="0"
                        reactionsEnabled="1"
                        emitMetadata="0"
                        inputPosition="bottom"
                        theme={darkMode ? "noborder_gray" : "light"}
                        lang="en"
                        loading="lazy"
                    />
                </Pane>
            </ThemeProvider>
        </div>
    );
};

export default NotesBlogs;
