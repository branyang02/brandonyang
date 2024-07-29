import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import { useDarkMode } from './context/DarkModeContext';
import { Pane, majorScale } from 'evergreen-ui';
import './styles/App.css';
import Projects from './pages/Projects';
import Home from './pages/Home';
import Blog from './pages/Blog';
import Notes from './pages/Notes';
import Coursework from './pages/Coursework';

const App = () => {
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
            <Pane display="flex" alignItems="center" justifyContent="center">
                <Pane
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    width="100%"
                    maxWidth={majorScale(150)}
                    padding={majorScale(3)}
                    // background="grey"
                >
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/projects" element={<Projects />} />
                        <Route path="/blog" element={<Blog />} />
                        <Route path="/notes" element={<Notes />} />
                        <Route path="/coursework" element={<Coursework />} />
                    </Routes>
                </Pane>
            </Pane>
        </Pane>
    );
};

export default App;
