import { useSpinner, useConfig } from "#utils";
import { Command } from "commander";
import { rm } from "node:fs/promises";

export function addClean(): Command {
    const command = new Command()
        .command("clean")
        .description("remove unwanted files")
        .option("-f, --force", "force clean up")
        .option("-w, --wipe", "remove node_modules and bun.lockb")
        .action(async ({ force, wipe }: { force: boolean, wipe: boolean }) => {
            const spinner = useSpinner("Cleaning...").start();

            const config = await useConfig();

            const clean: Array<string> = config.clean;

            if (wipe) clean.push("node_modules", "bun.lock");

            if (clean.length === 0) {
                spinner.warn("Nothing to clean");
                return;
            }

            for await (const path of clean) {
                spinner.text = `Removing ${path}`;

                await rm(path, {
                    force: force,
                    recursive: true
                });
            }

            spinner.succeed(`Cleaned: ${clean.join(", ")}`);
        });

    return command;
}
