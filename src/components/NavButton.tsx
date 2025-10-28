import React, { useState } from "react";
import {
    Button,
    IconButton,
    MenuIcon,
    Popover,
    Menu,
    Position,
    Text,
} from "evergreen-ui";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { useDarkMode } from "../context/DarkModeContext";

const handleSelect = (tab: string, navigate: NavigateFunction) => {
    let path: string;

    switch (tab) {
        case "Home":
            path = "/";
            navigate(path);
            break;
        // case "CV":
        //     path = "/brandon_yifan_yang_cv.pdf";
        //     window.open(path, "_blank");
        //     break;
        default:
            path = `/${tab.toLowerCase().replace(/\s+/g, "")}`;
            navigate(path);
            break;
    }
};

const NavWebMenu = ({ tabs }: { tabs: string[] }) => {
    const { darkMode } = useDarkMode();
    return tabs.map((label) => (
        <NavButton key={label} label={label} darkMode={darkMode} />
    ));
};

const NavMobileMenu = ({ tabs }: { tabs: string[] }) => {
    const navigate = useNavigate();

    return (
        <Popover
            position={Position.BOTTOM_LEFT}
            content={
                <Menu>
                    <Menu.Group>
                        {tabs.map((tab) => (
                            <Menu.Item
                                key={tab}
                                onSelect={() => handleSelect(tab, navigate)}
                            >
                                {tab}
                            </Menu.Item>
                        ))}
                    </Menu.Group>
                </Menu>
            }
        >
            <IconButton icon={MenuIcon} marginRight={16} />
        </Popover>
    );
};

const NavButton = ({
    label,
    darkMode,
}: {
    label: string;
    darkMode: boolean;
}) => {
    const [isHovered, setIsHovered] = useState(false);
    const navigate = useNavigate();

    const buttonStyle: React.CSSProperties = {
        backgroundColor: darkMode && isHovered ? "#444" : "transparent",
        transition: "background-color 0.3s ease",
    };

    const defaultStyle: React.CSSProperties = {
        WebkitFontSmoothing: "antialiased",
        appearance: "none",
    };

    return (
        <Button
            appearance="minimal"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => handleSelect(label, navigate)}
            style={darkMode ? buttonStyle : defaultStyle}
        >
            <Text size={500} color={darkMode ? "tint2" : "default"}>
                {label}
            </Text>
        </Button>
    );
};

export { NavMobileMenu, NavWebMenu };
