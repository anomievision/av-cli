import { beforeEach, describe, expect, test } from "bun:test";
import { $ } from "bnx";

describe("anomie", () => {
	test("--help", async () => {
		const command = await $("dist/bin/anomie --help");

		expect(command).toContain("Usage: anomie [options] [command]");
	});
});
