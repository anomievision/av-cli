import { getConfig } from "../../../utils";
import { Command } from "commander";
import { rm } from "node:fs/promises";

export function addClean(): Command {
    const command = new Command()
        .command("clean")
        .description("clean up project")
        .option("-a, --all", "clean up all")
        .option("-f, --force", "force clean up")
        .action(async ({ all, force }: { all: boolean, force: boolean }) => {
            const config = await getConfig();

            if (all) {
                config.clean.push("node_modules");
                config.clean.push("bun.lockb");
            }

            await rm(config.clean.join(" "), {
                force: force,
                recursive: true
            });
        });

    return command;
}
