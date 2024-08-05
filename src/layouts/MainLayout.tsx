import { Pane, majorScale } from "evergreen-ui";
import { useDarkMode } from "../context/DarkModeContext";
import NavBar from "../components/NavBar";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
    const { darkMode } = useDarkMode();

    return (
        <Pane
            background={darkMode ? "#333" : "tint2"}
            style={{
                display: "flex",
                flexDirection: "column",
                minHeight: "100vh",
            }}
        >
            <NavBar />
            <Pane display="flex" alignItems="center" justifyContent="center">
                <Pane
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    width="100%"
                    maxWidth={majorScale(150)}
                    padding={majorScale(3)}
                >
                    {children}
                </Pane>
            </Pane>
        </Pane>
    );
};

export default MainLayout;
