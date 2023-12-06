import { $ } from "bnx";
import { Command } from "commander";
import { getConfig } from "../../../utils";

export async function addUpdate() {
	const command = new Command()
		.command("update")
		.description("update project")
		.option("-w, --write", "write changes to package.json")
		.action(async ({ write }) => {
			const config = await getConfig();

			const writeFlag = write ? " --write" : "";
			const excludeFlag =
				config.update.ignore.length > 0
					? ` --exclude ${config.update.ignore.join(" ")}`
					: "";

			const args = `${writeFlag}${excludeFlag}`;

			const result = await $(`bunx taze major${args}`);

			// biome-ignore lint/suspicious/noConsoleLog: <explanation>
			console.log(result.replace(/npm/g, "bun"));
		});

	return command;
}
