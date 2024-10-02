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

    const equations = markdown.match(inlineEquationRegex)?.length ?? 0;
    const blockEquations = markdown.match(blockEquationRegex)?.length ?? 0;
    const totalEquations = equations + blockEquations;

    const markdownWithoutEquations = markdown
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
