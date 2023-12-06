import { Command } from "commander";
import { addBiome, addClean, addHusky, addInit, addUpdate } from "./commands";

const program = new Command();

program
	.name("bli")
	.description("Bun based CLI for managing your projects")
	.version("0.0.1");

// program.addCommand(addInit());
// program.addCommand(addUpdate());
// program.addCommand(addClean());
// program.addCommand(addBiome());
// program.addCommand(addHusky());

program.parse(process.argv);
