import {
    Pane,
    Heading,
    majorScale,
    Switch,
    MoonIcon,
    LightbulbIcon,
} from "evergreen-ui";
import { useDarkMode } from "../context/DarkModeContext";
import { useEffect, useState } from "react";
import { NavMobileMenu, NavWebMenu } from "./NavButton";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
    const { darkMode, toggleDarkMode } = useDarkMode();
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 1000);
    const [checked, setChecked] = useState(darkMode);
    const navigate = useNavigate();

    const NAME = "Brandon Y. Yang";
    const TABS = ["Home", "CV", "Blog", "Notes", "Projects"];

    const handleSwitchChange = () => {
        setChecked(!checked);
        toggleDarkMode();
    };

    const handleResize = () => {
        setIsMobile(window.innerWidth <= 1000);
    };

    useEffect(() => {
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <Pane
            display="flex"
            alignItems="center"
            justifyContent="center"
            height={majorScale(10)}
            borderBottom="default"
        >
            <Pane
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                width="100%"
                maxWidth={majorScale(150)}
                padding={majorScale(3)}
            >
                <Heading
                    size={800}
                    color={darkMode ? "white" : "default"}
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate("/")}
                >
                    {NAME}
                </Heading>
                <Pane display="flex" alignItems="center">
                    <Pane
                        display="flex"
                        alignItems="center"
                        marginRight={majorScale(1)}
                    >
                        {darkMode ? (
                            <MoonIcon color="muted" />
                        ) : (
                            <LightbulbIcon color="muted" />
                        )}
                        <Switch
                            checked={checked}
                            marginLeft={majorScale(1)}
                            marginRight={majorScale(1)}
                            onChange={handleSwitchChange}
                        >
                            dark mode
                        </Switch>
                    </Pane>
                    {isMobile ? (
                        <NavMobileMenu tabs={TABS} />
                    ) : (
                        <NavWebMenu tabs={TABS} />
                    )}
                </Pane>
            </Pane>
        </Pane>
    );
};

export default NavBar;
