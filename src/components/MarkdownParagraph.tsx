import React from "react";
import { Link, Paragraph, Strong, Text } from "evergreen-ui";
import "../styles/TextLink.css";
import { useDarkMode } from "../context/DarkModeContext";

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
    const colorClass = darkMode ? "dark-mode" : "light-mode";

    const isExternalLink = (url: string) => {
        try {
            const linkUrl = new URL(url, window.location.href);
            return linkUrl.origin !== window.location.origin;
        } catch (error) {
            return false;
        }
    };

    const external = isExternalLink(href);

    return (
        <div className="text-link-container">
            <Link
                href={href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
            >
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
        const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
        const colorRegex = /\[color:([^\]]+)\](.*?)\[\/color\]/g;
        const boldRegex = /\*\*(.*?)\*\*/g;
        const italicRegex = /(?:\*|_)(.*?)(?:\*|_)/g;

        const parts = [];
        let lastIndex = 0;

        while (lastIndex < input.length) {
            linkRegex.lastIndex = lastIndex;
            colorRegex.lastIndex = lastIndex;
            boldRegex.lastIndex = lastIndex;
            italicRegex.lastIndex = lastIndex;

            const linkMatch = linkRegex.exec(input);
            const colorMatch = colorRegex.exec(input);
            const boldMatch = boldRegex.exec(input);
            const italicMatch = italicRegex.exec(input);

            let nextMatch = null;
            const matches = [
                linkMatch,
                colorMatch,
                boldMatch,
                italicMatch,
            ].filter(Boolean);
            if (matches.length > 0) {
                nextMatch = matches.reduce(
                    (closest, match) =>
                        !closest || (match && match.index < closest.index)
                            ? match
                            : closest,
                    null
                );
            }

            if (!nextMatch) {
                parts.push(input.slice(lastIndex));
                break;
            }

            if (nextMatch.index > lastIndex) {
                parts.push(input.slice(lastIndex, nextMatch.index));
            }

            if (nextMatch === linkMatch) {
                const [, text, href] = nextMatch;
                parts.push(
                    <TextLink
                        key={href + nextMatch.index}
                        href={href}
                        darkMode={darkMode}
                    >
                        {text}
                    </TextLink>
                );
                lastIndex = linkRegex.lastIndex;
            } else if (nextMatch === colorMatch) {
                const [, colorCode, text] = nextMatch;
                parts.push(
                    <Strong
                        key={colorCode + nextMatch.index}
                        style={{ color: colorCode }}
                        size={TEXT_SIZE}
                    >
                        {text}
                    </Strong>
                );
                lastIndex = colorRegex.lastIndex;
            } else if (nextMatch === boldMatch) {
                const [, text] = nextMatch;
                parts.push(
                    <Strong
                        key={text + nextMatch.index}
                        size={TEXT_SIZE}
                        color={darkMode ? "tint2" : "default"}
                    >
                        {text}
                    </Strong>
                );
                lastIndex = boldRegex.lastIndex;
            } else if (nextMatch === italicMatch) {
                const [, text] = nextMatch;
                parts.push(
                    <Text
                        key={text + nextMatch.index}
                        style={{ fontStyle: "italic" }}
                        size={TEXT_SIZE}
                    >
                        {text}
                    </Text>
                );
                lastIndex = italicRegex.lastIndex;
            }
        }

        return parts;
    };

    const paragraphs = text.split(/\n\s*\n/).map((paragraph, index) => (
        <Paragraph
            key={index}
            color={darkMode ? "tint2" : "default"}
            size={TEXT_SIZE}
            marginBottom={index < text.split(/\n\s*\n/).length - 1 ? 16 : 0}
        >
            {parseText(paragraph)}
        </Paragraph>
    ));

    return <>{paragraphs}</>;
};

export default MarkdownParagraph;
