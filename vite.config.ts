import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { execSync } from "child_process";

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

export default defineConfig({
    plugins: [react()],
    assetsInclude: ["**/*.md"],
    define: {
        "import.meta.env.VITE_ML_COMMIT_DATE": JSON.stringify(
            getLastCommitDate("src/assets/notes/ml.md")
        ),
    },
});
