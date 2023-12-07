// import { version } from "./constants/version";
import { Command } from "commander";
// import { rm } from "node:fs/promises";

// const repo = "anomievision/anomie-cli";

export function addUpgrade(): Command {
    const command = new Command()
        .command("upgrade")
        .description("upgrade project")
        .option("-f, --force", "force upgrade")
        .action(async () => {
        // .action(async ({ force }) => {
            // if (force)
            //     await rm(".anomie");
            // else
            //     await rm(".anomie/bin/anomie");

            // try {
            //     // Query the latest version of anomie-cli: https://github.com/anomievision/anomie-cli
            //     const response = await fetch(`https://api.github.com/repos/${repo}/releases/latest`);

            //     console.log(response);
            // } catch (error) {}
        });

    return command;
}
