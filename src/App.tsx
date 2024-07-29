import { Route, Routes } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import NotieLayout from './layouts/NotieLayout';
import Projects from './pages/Projects';
import Home from './pages/Home';
import Coursework from './pages/Coursework';
import NoteBlogCards from './pages/NoteBlogCards';
import NotesBlogs from './pages/NoteBlogs';

const App = () => {
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <MainLayout>
                        <Home />
                    </MainLayout>
                }
            />
            <Route
                path="/projects"
                element={
                    <MainLayout>
                        <Projects />
                    </MainLayout>
                }
            />
            <Route
                path="/coursework"
                element={
                    <MainLayout>
                        <Coursework />
                    </MainLayout>
                }
            />
            <Route
                path="/blog"
                element={
                    <NotieLayout>
                        <NoteBlogCards type="blogs" />
                    </NotieLayout>
                }
            />
            <Route
                path="/notes"
                element={
                    <NotieLayout>
                        <NoteBlogCards type="notes" />
                    </NotieLayout>
                }
            />

            <Route
                path="/notes/:noteId"
                element={
                    <NotieLayout>
                        <NotesBlogs type="notes" />
                    </NotieLayout>
                }
            />
            <Route
                path="/blogs/:blogId"
                element={
                    <NotieLayout>
                        <NotesBlogs type="blogs" />
                    </NotieLayout>
                }
            />
        </Routes>
    );
};

export default App;
