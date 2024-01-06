import { describe, expect, test } from "bun:test";
// import { beforeEach } from "bun:test";
import { $ } from "bnx";

describe("cli", () => {
    test("--help", async () => {
        const command = await $("dist/cli --help");

        expect(command).toContain("Usage: cli [options] [command]");
    });
});
