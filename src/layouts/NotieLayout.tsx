import { Pane } from 'evergreen-ui';
import { useDarkMode } from '../context/DarkModeContext';
import NavBar from '../components/NavBar';

const NotieLayout = ({ children }: { children: React.ReactNode }) => {
    const { darkMode } = useDarkMode();

    return (
        <Pane
            background={darkMode ? '#333' : 'tint2'}
            style={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh',
            }}
        >
            <NavBar />
            <Pane className="main-content">{children}</Pane>
        </Pane>
    );
};

export default NotieLayout;
