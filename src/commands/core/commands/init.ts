import { Command } from "commander";

export function addInit(): Command {
    const command = new Command()
        .command("init")
        .description("initialize project");

    return command;
}
