import { addClean, addHusky, addInit, addUpdate } from "./commands";
import { Command } from "commander";

const program = new Command();

program
    .name("anomie")
    .description("AnomieVision CLI for managing our projects")
    .version("0.0.1");

program.addCommand(addInit());
program.addCommand(addUpdate());
program.addCommand(addClean());
program.addCommand(addHusky());

program.parse(process.argv);
