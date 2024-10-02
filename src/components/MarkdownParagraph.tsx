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

        const parts = [];
        let lastIndex = 0;

        while (lastIndex < input.length) {
            linkRegex.lastIndex = lastIndex;
            colorRegex.lastIndex = lastIndex;

            const linkMatch = linkRegex.exec(input);
            const colorMatch = colorRegex.exec(input);

            let nextMatch = null;
            if (
                linkMatch &&
                (!colorMatch || linkMatch.index <= colorMatch.index)
            ) {
                nextMatch = { type: "link", match: linkMatch };
            } else if (colorMatch) {
                nextMatch = { type: "color", match: colorMatch };
            }

            if (!nextMatch) {
                parts.push(input.slice(lastIndex));
                break;
            }

            if (nextMatch.match.index > lastIndex) {
                parts.push(input.slice(lastIndex, nextMatch.match.index));
            }

            if (nextMatch.type === "link") {
                const [, text, href] = nextMatch.match;
                parts.push(
                    <TextLink
                        key={href + nextMatch.match.index}
                        href={href}
                        darkMode={darkMode}
                    >
                        {text}
                    </TextLink>
                );
                lastIndex = linkRegex.lastIndex;
            } else if (nextMatch.type === "color") {
                const [, colorCode, text] = nextMatch.match;
                parts.push(
                    <Strong
                        key={colorCode + nextMatch.match.index}
                        style={{ color: colorCode }}
                        size={TEXT_SIZE}
                    >
                        {text}
                    </Strong>
                );
                lastIndex = colorRegex.lastIndex;
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
