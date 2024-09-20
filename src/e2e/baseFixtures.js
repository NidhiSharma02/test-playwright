import { test as baseTest } from "@playwright/test";
import * as crypto from "node:crypto";
import * as fs from "node:fs";
import * as path from "node:path";

const istanbulCLIOutput = path.join(process.cwd(), ".nyc_output");

export function generateUUID() {
	return crypto.randomBytes(16).toString("hex");
}

export const test = baseTest.extend({
	context: async ({ context }, use) => {
		await context.addInitScript(() =>
			window.addEventListener("beforeunload", () =>
				// biome-ignore lint/suspicious/noExplicitAny: <explanation>
				window.collectIstanbulCoverage(
					// biome-ignore lint/suspicious/noExplicitAny: <explanation>
					JSON.stringify(window.__coverage__),
				),
			),
		);
		await fs.promises.mkdir(istanbulCLIOutput, { recursive: true });
		await context.exposeFunction("collectIstanbulCoverage", (coverageJSON) => {
			if (coverageJSON)
				fs.writeFileSync(
					path.join(
						istanbulCLIOutput,
						`playwright_coverage_${generateUUID()}.json`,
					),
					coverageJSON,
				);
		});
		await use(context);
		for (const page of context.pages()) {
			await page.evaluate(() =>
				// biome-ignore lint/suspicious/noExplicitAny: <explanation>
				window.collectIstanbulCoverage(
					// biome-ignore lint/suspicious/noExplicitAny: <explanation>
					JSON.stringify(window.__coverage__),
				),
			);
		}
	},
});

export const expect = test.expect;
