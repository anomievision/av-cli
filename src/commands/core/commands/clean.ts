import { rm } from "node:fs/promises";
import { Command } from "commander";
import { getConfig } from "../../../utils";

export async function addClean() {
	const command = new Command()
		.command("clean")
		.description("clean up project")
		.option("-a, --all", "clean up all")
		.option("-f, --force", "force clean up")
		.action(async ({ all, force }) => {
			const config = await getConfig();

			if (all) {
				config.clean.push("node_modules");
				config.clean.push("bun.lockb");
			}

			await rm(config.clean.join(" "), {
				force: force,
			});
		});

	return command;
}
