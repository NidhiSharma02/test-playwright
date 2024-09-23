import { defineConfig } from "@playwright/test";
import dotenv from "dotenv";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, "", ".env") });

export default defineConfig({
	testDir: "./src/e2e",
	// globalSetup: path.resolve(__dirname, "./src/e2e/GlobalSetup.ts"),

	fullyParallel: false,
	forbidOnly: false,
	retries: 0,
	workers: 1,
	reporter: "html",
	use: {
		baseURL: "http://localhost:3000",
		trace: "on-first-retry",
		browserName: "chromium",
	},
	// projects: [
	// 	{
	// 		name: "chromium",
	// 		use: { ...devices["Desktop Chrome"] },
	// 	},
	// ],

	projects: [
		{
			name: "setup",
			testMatch: "**/*.setup.js",
		},
		{
			name: "e2e",
			dependencies: ["setup"],
			use: {
				storageState: path.resolve(__dirname, "src/e2e/auth.json"),
			},
		},
	],
	webServer: {
		command: "pnpm start",
		url: "http://localhost:3000",
		reuseExistingServer: true,
		timeout: 120 * 1000,
		env: {
			USE_BABEL_PLUGIN_ISTANBUL: "1",
		},
	},
});
