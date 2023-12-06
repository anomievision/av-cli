import { Command } from "commander";
import { rm } from "node:fs/promises";

export function addUpgrade(): Command {
    const command = new Command()
        .command("upgrade")
        .description("upgrade project")
        .option("-f, --force", "force upgrade")
        .action(async ({ force }) => {
            if (force)
                await rm(".bli");
            else
                await rm(".bli/bin/bli");

            //
        });

    return command;
}
