import path from "node:path";
import { fileURLToPath } from "node:url";
// import path from "node:path";
import {
	// chromium,
	expect,
} from "@playwright/test";
// import { test as setup } from "src/e2e/baseFixtures";
import { test as setup } from "./baseFixtures";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

setup("do login", async ({ page }) => {
	await page.goto("/", { waitUntil: "networkidle" }); // Ensure the page is fully loaded

	// Check if the login heading is visible
	await expect(page.getByRole("heading", { name: "Login" })).toBeVisible();

	// Fill in the login formewe
	await page.fill("input#email", "mayank.kumar@zeitview.com");
	await page.fill("input#password", "@Testing5624");

	// Click on the submit button
	await page.click("#login");

	// await page.waitForURL("http://localhost:3000/");

	const storageState = path.join(__dirname, "./auth.json");

	// Save storage state for authentication persistence
	await page.context().storageState({ path: storageState });
});
