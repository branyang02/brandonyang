import { Pane, majorScale } from "evergreen-ui";
import { useDarkMode } from "../context/DarkModeContext";
import NavBar from "../components/NavBar";

const NotieLayout = ({ children }: { children: React.ReactNode }) => {
    const { darkMode } = useDarkMode();

    return (
        <Pane
            background={darkMode ? "#333" : "rgb(245, 244, 239)"}
            style={{
                display: "flex",
                flexDirection: "column",
                minHeight: "100vh",
            }}
        >
            <NavBar />
            <Pane
                className="main-content"
                maxWidth={majorScale(180)}
                style={{
                    margin: "0 auto",
                    width: "100%",
                }}
            >
                {children}
            </Pane>
        </Pane>
    );
};

export default NotieLayout;
