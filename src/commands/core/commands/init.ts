import { Command } from "commander";

export async function addInit() {
	const command = new Command()
		.command("init")
		.description("initialize project");

	return command;
}
