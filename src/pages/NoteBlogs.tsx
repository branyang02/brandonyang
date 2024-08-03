import { Notie } from 'notie-markdown';
import { useParams } from 'react-router-dom';
import { useDarkMode } from '../context/DarkModeContext';
import { useEffect, useState } from 'react';
import { majorScale, Pane, Spinner } from 'evergreen-ui';

const NoteModules = import.meta.glob('../assets/notes/*.md', { as: 'raw' });
const BlogModules = import.meta.glob('../assets/blogs/*.md', { as: 'raw' });

const NotesBlogs = ({ type }: { type: string }) => {
    const [markdown, setMarkdown] = useState<string>('');
    const [isLoading, setIsLoading] = useState(true);
    const params = useParams();
    const { darkMode } = useDarkMode();
    const contentId = type === 'notes' ? params.noteId : params.blogId;

    useEffect(() => {
        setIsLoading(true);
        const modules = type === 'notes' ? NoteModules : BlogModules;
        for (const path in modules) {
            if (path.includes(contentId as string)) {
                const rawMDString = String(modules[path]);
                setMarkdown(rawMDString);
                setIsLoading(false);
                break;
            }
        }
    }, [contentId, type]);

    return (
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
                    darkMode={darkMode}
                    style={{
                        background: darkMode ? '#333' : '#F9FAFC',
                    }}
                />
            )}
        </Pane>
    );
};

export default NotesBlogs;
