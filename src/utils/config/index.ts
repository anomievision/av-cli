type AnomieConfig = {
	clean: string[];
	update: {
		ignore: string[];
	};
};

export async function getConfig(): Promise<AnomieConfig> {
	const potentialPaths = [
		"/anomie.config.json",
		"/.anomie/anomie.config.js",
		"/pkg/anomie.config.json",
	];

	let config: AnomieConfig | undefined;

	for (const path of potentialPaths) {
		const filePath = `${process.cwd()}${path}`;
		if (await Bun.file(filePath).exists()) {
			config = await Bun.file(filePath).json();
			break; // Stop searching once a valid config is found
		}
	}

	return (
		config || {
			clean: [],
			update: {
				ignore: [],
			},
		}
	);
}
