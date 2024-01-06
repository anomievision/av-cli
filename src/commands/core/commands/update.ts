import { useConfig } from "#utils";
import { $ } from "bnx";
import { Command } from "commander";

export function addUpdate(): Command {
    const command = new Command()
        .command("update")
        .description("update project")
        .option("-i, --install", "install dependencies")
        .option("-w, --write", "write changes to package.json")
        .action(async ({ install, write }: { install: boolean, write: boolean }) => {
            const config = await useConfig();

            const writeFlag = write ? " --write" : "";
            const excludeFlag = config.update.ignore.length > 0 ? ` --exclude ${config.update.ignore.join(" ")}` : "";

            const args = `${writeFlag}${excludeFlag}`;

            const result = await $(`bunx taze major${args}`);

            console.log(result.replace(/npm/g, "bun"));

            if (install)
                await $("bun install");
        });

    return command;
}
