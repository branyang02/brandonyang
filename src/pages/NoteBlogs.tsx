import 'katex/dist/katex.min.css';
import '../styles/note-post.css';

import { majorScale, Pane, Spinner } from 'evergreen-ui';
import { useEffect, useState, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { useParams } from 'react-router-dom';
import rehypeHighlight from 'rehype-highlight';
import rehypeKatex from 'rehype-katex';
import rehypeRaw from 'rehype-raw';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';

import CodeBlock from '../components/CodeBlock';
import NoteToc from '../components/NoteToc';
import StaticCodeBlock from '../components/StaticCodeBlock';
import TikZ from '../components/TikZ';
import ScrollToTopButton from '../components/ScrollToTopButton';

const NoteModules = import.meta.glob('../assets/notes/*.md', { as: 'raw' });
const BlogModules = import.meta.glob('../assets/blogs/*.md', { as: 'raw' });

type CodeProps = React.HTMLAttributes<HTMLElement> & {
    node?: unknown;
    inline?: boolean;
    className?: string;
    children?: React.ReactNode;
};

const components = {
    code({ inline, className, children, ...props }: CodeProps) {
        const match = /\w+/.exec(className || '');

        if (!inline && match) {
            const language = className?.split('language-').pop() || '';
            const content = Array.isArray(children)
                ? children.join('')
                : children;
            const code = String(content).replace(/\n$/, '');
            if (language.includes('execute-')) {
                return (
                    <CodeBlock
                        initialCode={code}
                        language={language.split('-').pop()}
                    />
                );
            }
            if (language === 'tikz') {
                return <TikZ tikzScript={code} />;
            }
            return <StaticCodeBlock code={code} language={language} />;
        } else {
            return (
                <code className={className} {...props}>
                    {children}
                </code>
            );
        }
    },
};

function processMarkdown(markdownContent: string): string {
    const pattern = /```(\w+)/g;
    const processedContent = markdownContent.replace(pattern, '```language-$1');

    return processedContent;
}

const NotesBlogs = ({ type }: { type: string }) => {
    const params = useParams();
    const [markdownContent, setMarkdownContent] = useState<string>('');
    const [activeId, setActiveId] = useState<string>('');
    const contentRef = useRef<HTMLDivElement>(null);

    const contentId = type === 'notes' ? params.noteId : params.blogId;

    useEffect(() => {
        const fetchNote = async () => {
            const modules = type === 'notes' ? NoteModules : BlogModules;
            for (const path in modules) {
                if (path.includes(contentId as string)) {
                    const rawMDString = String(modules[path]);
                    setMarkdownContent(processMarkdown(rawMDString));
                }
            }
        };

        fetchNote();
    }, [contentId]);

    useEffect(() => {
        if (!contentRef.current) return;

        const headings = contentRef.current.querySelectorAll(
            'h1, h2, h3, h4, h5, h6',
        );
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            { rootMargin: '0px 0px -80% 0px' },
        );

        headings.forEach((heading) => observer.observe(heading));

        return () => {
            headings.forEach((heading) => observer.unobserve(heading));
        };
    }, [markdownContent]);

    if (!markdownContent) {
        return (
            <Pane
                display="flex"
                padding={majorScale(10)}
                justifyContent="center"
                height="100vh"
            >
                <Spinner />
            </Pane>
        );
    }

    return (
        <div className="notie-container">
            <Pane className="mw-page-container-inner">
                <Pane className="vector-column-start">
                    <NoteToc
                        markdownContent={markdownContent}
                        activeId={activeId}
                    />
                </Pane>
                <Pane className="mw-content-container">
                    <Pane className="blog-content" ref={contentRef}>
                        <ReactMarkdown
                            remarkPlugins={[remarkGfm, remarkMath]}
                            rehypePlugins={[
                                rehypeKatex,
                                rehypeRaw,
                                rehypeHighlight,
                                rehypeSlug,
                            ]}
                            components={components}
                        >
                            {markdownContent}
                        </ReactMarkdown>
                        <ScrollToTopButton />
                    </Pane>
                </Pane>
            </Pane>
        </div>
    );
};

export default NotesBlogs;
