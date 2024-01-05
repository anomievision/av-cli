import { addClean, addInit, addUpdate, addUpgrade } from "./commands";
import { version } from "./constants/version";
import { Command } from "commander";

const program = new Command();

program
    .name("anomie")
    .description("CLI for managing our projects")
    .version(version, "-v, --version", "output the current version");

program.addCommand(addInit());
program.addCommand(addClean());
program.addCommand(addUpdate());
program.addCommand(addUpgrade());

program.parse(process.argv);
