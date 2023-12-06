import { Command } from "commander";
import { init } from "./commands/init";

export function addHusky() {
	const command = new Command()
		.command("husky")
		.description("improves commits and more 🐶 woof");

	command
		.command("init")
		.description("initialize husky in project")
		.option("-d, --devDependencies", "install husky to devDependencies")
		.option("-g, --generate", "generate husky config files")
		.action(async (options) => {
			if (Object.keys(options).length === 0) {
				await init({
					devDependencies: true,
					generate: true,
				});
			} else {
				await init({
					devDependencies: options.devDependencies,
					generate: options.generate,
				});
			}
		});

	return command;
}
