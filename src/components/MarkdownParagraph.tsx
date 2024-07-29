import React from 'react';
import { Link, Paragraph, Text } from 'evergreen-ui';
import '../styles/TextLink.css';
import { useDarkMode } from '../context/DarkModeContext';

const TEXT_SIZE = 500;

const TextLink = ({
    href,
    darkMode,
    children,
}: {
    href: string;
    darkMode?: boolean;
    children: React.ReactNode;
}) => {
    const colorClass = darkMode ? 'dark-mode' : 'light-mode';

    return (
        <div className="text-link-container">
            <Link href={href} target="_blank" rel="noopener noreferrer">
                <Text className={`text-link ${colorClass}`} size={TEXT_SIZE}>
                    {children}
                </Text>
            </Link>
        </div>
    );
};

const MarkdownParagraph = ({ text }: { text: string }) => {
    const { darkMode } = useDarkMode();

    const parseText = (input: string) => {
        const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
        const parts = [];
        let lastIndex = 0;
        let match;

        while ((match = regex.exec(input)) !== null) {
            if (match.index > lastIndex) {
                parts.push(input.slice(lastIndex, match.index));
            }
            parts.push(
                <TextLink key={match[2]} href={match[2]} darkMode={darkMode}>
                    {match[1]}
                </TextLink>,
            );
            lastIndex = regex.lastIndex;
        }
        if (lastIndex < input.length) {
            parts.push(input.slice(lastIndex));
        }

        return parts;
    };

    return (
        <Paragraph color={darkMode ? 'tint2' : 'default'} size={TEXT_SIZE}>
            {parseText(text)}
        </Paragraph>
    );
};

export default MarkdownParagraph;
