import {
    Pane,
    Heading,
    majorScale,
    Switch,
    MoonIcon,
    LightbulbIcon,
} from 'evergreen-ui';
import { useDarkMode } from '../context/DarkModeContext';
import { useEffect, useState } from 'react';
import { NavButton, NavMobileMenu } from './NavButton';

const NavBar = () => {
    const { darkMode, toggleDarkMode } = useDarkMode();
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 1000);
    const [checked, setChecked] = useState(darkMode);

    const NAME = 'Brandon (Yifan) Yang';
    const TABS = [
        'Home',
        'Relevant Coursework',
        'Blog',
        'Notes',
        'Projects',
        'Resume',
    ];

    const handleSwitchChange = () => {
        setChecked(!checked);
        toggleDarkMode();
    };

    const handleResize = () => {
        setIsMobile(window.innerWidth <= 1000);
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
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
                <Heading size={800} color={darkMode ? 'white' : 'default'}>
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
                        TABS.map((label) => (
                            <NavButton
                                key={label}
                                label={label}
                                darkMode={darkMode}
                            />
                        ))
                    )}
                </Pane>
            </Pane>
        </Pane>
    );
};

export default NavBar;
