type Config = {
    clean: Array<string>,
    update: {
        ignore: Array<string>
    }
};

export async function getConfig(): Promise<Config> {
    const potentialPaths = [
        "/anomie.config.json",
        "/.anomie/anomie.config.json",
        "/pkg/anomie.config.json"
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
