type Config = {
    clean: Array<string>,
    update: {
        ignore: Array<string>
    }
};

export async function useConfig(): Promise<Config> {
    const potentialPaths = [
        "/cli.config.json",
        "/.cli/cli.config.json",
        "/pkg/cli.config.json"
    ];

    let config: Config | undefined;

    for await (const path of potentialPaths) {
        const file = Bun.file(`${process.cwd()}${path}`);

        if (await file.exists()) {
            config = await file.json();
            break;
        }
    }

    return (
        config ?? {
            clean: [],
            update: {
                ignore: []
            }
        }
    );
}
