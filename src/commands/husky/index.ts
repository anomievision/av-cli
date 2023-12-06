import { init } from "./commands/init";
import { Command } from "commander";

export function addHusky(): Command {
    const command = new Command()
        .command("husky")
        .description("improves commits and more 🐶 woof");

    command
        .command("init")
        .description("initialize husky in project")
        .option("-d, --devDependencies", "install husky to devDependencies")
        .option("-g, --generate", "generate husky config files")
        .action(async (options: { devDependencies?: boolean, generate?: boolean }) => {
            if (Object.keys(options).length === 0) {
                await init({
                    devDependencies: true,
                    generate: true
                });
            } else {
                await init({
                    devDependencies: options.devDependencies ?? false,
                    generate: options.generate ?? false
                });
            }
        });

    return command;
}
