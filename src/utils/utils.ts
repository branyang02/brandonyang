const modules = import.meta.glob("../assets/*/*.md", {
    query: "?raw",
    import: "default",
});

export function countWordsAndEquations(markdown: string) {
    let wordCount = 0;
    let equationCount = 0;
    let codeLineCount = 0;

    // Regex patterns
    const codeBlockRegex = /```[\s\S]*?```/g; // Matches code blocks
    const displayEquationRegex = /\$\$[\s\S]*?\$\$/g; // Matches display equations only
    const markdownSyntaxRegex = /(^#+\s*)|(`.*?`)/gm; // Matches markdown headings and inline code

    // Remove code blocks and count lines within them
    const codeBlocks = markdown.match(codeBlockRegex);
    if (codeBlocks) {
        for (const codeBlock of codeBlocks) {
            const linesInCodeBlock = codeBlock.split("\n").length;
            codeLineCount += linesInCodeBlock;
        }
        // Remove code blocks from markdown
        markdown = markdown.replace(codeBlockRegex, "");
    }

    // Remove display equations and count them
    const displayEquations = markdown.match(displayEquationRegex);
    if (displayEquations) {
        for (const displayEquation of displayEquations) {
            // Remove the display equation from markdown
            markdown = markdown.replace(displayEquation, "");

            let localEquationCount = 0;

            // Find align environments within the display equation
            const alignEnvRegex =
                /\\begin\{(align\*?|aligned)\}([\s\S]*?)\\end\{\1\}/g;
            let alignMatch;
            let remainingEquation = displayEquation;

            while (
                (alignMatch = alignEnvRegex.exec(displayEquation)) !== null
            ) {
                const alignContent = alignMatch[2]; // Content inside align environment
                // Split alignContent by lines (using \\)
                const lines = alignContent.split(/\\\\\s*/);
                localEquationCount += lines.length;

                // Remove the align environment from remainingEquation
                remainingEquation = remainingEquation.replace(
                    alignMatch[0],
                    ""
                );
            }

            // After removing align environments, check for remaining content
            const remainingContent = remainingEquation
                .replace(/^\$\$|\$\$$/g, "") // Remove $$ delimiters
                .trim();

            if (remainingContent.length > 0) {
                // If there's remaining content, count it as one equation
                localEquationCount += 1;
            }

            equationCount += localEquationCount;
        }
    }

    // Remove markdown syntax (headings and inline code)
    markdown = markdown.replace(markdownSyntaxRegex, "");

    // Split the remaining markdown into words (including inline equations)
    const words = markdown.split(/\s+/).filter((word) => word.length > 0);

    wordCount = words.length;

    return {
        wordCount,
        equationCount,
        codeLineCount,
    };
}

export async function getMarkdown() {
    let markdownString = "";
    for (const path in modules) {
        const rawMDString = await modules[path]();
        markdownString += `\n${rawMDString}`;
    }
    return markdownString;
}
