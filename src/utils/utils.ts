const modules = import.meta.glob("../assets/*/*.md", {
    query: "?raw",
    import: "default",
});

export async function countWordsAndEquations(): Promise<{
    wordCount: number;
    equationCount: number;
}> {
    const markdown = await getMarkdown();

    const inlineEquationRegex = /\$(.+?)\$/g;
    const blockEquationRegex = /\$\$(.+?)\$\$/g;
    const codeBlockRegex = /```[\s\S]*?```/g;
    const htmlTagRegex = /<\/?[^>]+(>|$)/g;

    let markdownWithoutCodeBlocks = markdown.replace(codeBlockRegex, "");

    markdownWithoutCodeBlocks = markdownWithoutCodeBlocks.replace(
        htmlTagRegex,
        ""
    );

    const equations =
        markdownWithoutCodeBlocks.match(inlineEquationRegex)?.length ?? 0;
    const blockEquations =
        markdownWithoutCodeBlocks.match(blockEquationRegex)?.length ?? 0;
    const totalEquations = equations + blockEquations;

    const markdownWithoutEquations = markdownWithoutCodeBlocks
        .replace(inlineEquationRegex, "")
        .replace(blockEquationRegex, "");

    const wordCount = markdownWithoutEquations
        .split(/\s+/)
        .filter((word) => word.length > 0).length;

    return { wordCount, equationCount: totalEquations };
}

async function getMarkdown() {
    let markdownString = "";
    for (const path in modules) {
        const rawMDString = await modules[path]();
        markdownString += rawMDString;
    }
    return markdownString;
}
