import axios from "axios";
import { Buffer } from "buffer";
import dotenv from "dotenv";
dotenv.config();

const OWNER = process.env.GITHUB_OWNER;   // your GitHub username/org
const REPO = process.env.GITHUB_REPO;     // your repo name
const GITHUB_TOKEN = process.env.GITHUB_TOKEN; // GitHub token

/**
 * Uploads or updates a file in GitHub repo
 * @param {string} category - Component category folder
 * @param {string} componentName - Component file name (without extension)
 * @param {string} fileContent - JSX code/content of the component
 * @returns {object} - { success: boolean, message: string, data?: any }
 */
export async function uploadFileToGitHub(category, componentName, fileContent) {
    const path = `src/uploads/components/${category}/${componentName}.jsx`;
    const url = `https://api.github.com/repos/${OWNER}/${REPO}/contents/${path}`;

    // encode file content to base64
    const encodedContent = Buffer.from(fileContent).toString("base64");

    try {
        const response = await axios.put(
            url,
            {
                message: `Added/Updated ${componentName} in ${category}`,
                content: encodedContent,
            },
            {
                headers: {
                    Authorization: `token ${GITHUB_TOKEN}`,
                    "Content-Type": "application/json",
                },
            }
        );

        console.log(`✅ File ${componentName}.jsx uploaded to GitHub at ${path}`);

        return {
            success: true,
            message: `File ${componentName}.jsx uploaded successfully`,
            data: response.data,
        };
    } catch (error) {
        console.error("❌ Upload failed:", error.response?.data || error.message);

        return {
            success: false,
            message: error.response?.data?.message || "Failed to upload file to GitHub",
            data: error.response?.data || error.message,
        };
    }
}
