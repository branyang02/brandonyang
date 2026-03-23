import { defineConfig, Plugin } from "vite";
import react from "@vitejs/plugin-react";
import { execSync } from "child_process";
import fs from "fs";

const getLastCommitDate = (filePath: string) => {
    try {
        return execSync(`git log -1 --format=%cd -- ${filePath}`, {
            encoding: "utf-8",
        }).trim();
    } catch (error) {
        console.error(`Failed to get the last commit date: ${error}`);
        return "";
    }
};

function markdownHmrPlugin(): Plugin {
    return {
        name: "markdown-hmr",
        handleHotUpdate({ file, server }) {
            if (file.endsWith(".md")) {
                const content = fs.readFileSync(file, "utf-8");
                server.ws.send({
                    type: "custom",
                    event: "md-update",
                    data: { file, content },
                });
                return [];
            }
        },
    };
}

export default defineConfig({
    plugins: [react(), markdownHmrPlugin()],
    assetsInclude: ["**/*.md"],
    define: {
        "import.meta.env.VITE_ML_COMMIT_DATE": JSON.stringify(
            getLastCommitDate("src/assets/notes/ml.md")
        ),
    },
});
