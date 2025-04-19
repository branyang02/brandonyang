import React, {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from "react";

type DarkModeContextType = {
    darkMode: boolean;
    toggleDarkMode: () => void;
};

const DarkModeContext = createContext<DarkModeContextType | undefined>(
    undefined
);

export const DarkModeProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [darkMode, setDarkMode] = useState<boolean>(() => {
        const savedMode = localStorage.getItem("darkMode");
        if (savedMode === null) {
            const currentHour = new Date().getHours();
            return currentHour >= 18 || currentHour < 6;
        }
        return savedMode === "true";
    });

    useEffect(() => {
        localStorage.setItem("darkMode", darkMode.toString());

        document.body.classList.toggle("dark-mode", darkMode);
    }, [darkMode]);

    const toggleDarkMode = () => {
        setDarkMode((prevMode) => !prevMode);
    };

    return (
        <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
            {children}
        </DarkModeContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useDarkMode = () => {
    const context = useContext(DarkModeContext);
    if (context === undefined) {
        throw new Error("useDarkMode must be used within a DarkModeProvider");
    }
    return context;
};
