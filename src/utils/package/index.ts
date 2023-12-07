import type { PackageJSON } from "../../types";

export async function getPackageVersion(packageName: string): Promise<string | null> {
    try {
        const packageJson: PackageJSON = await Bun.file(`${process.cwd()}/package.json`).json();
        let version = null;

        if (packageJson.dependencies?.[packageName])
            version = packageJson.dependencies[packageName];

        if (packageJson.devDependencies?.[packageName])
            version = packageJson.devDependencies[packageName];

        if (packageJson.peerDependencies?.[packageName])
            version = packageJson.peerDependencies[packageName];

        if (version !== null) return version.replace("^", "");

        throw new Error(`${packageName} not found in package.json`);
    } catch (error: unknown) {
        let _error;

        if (error instanceof Error)
            _error = error;
        else if (typeof error === "string")
            _error = new Error(error);

        console.error("getPackageVersion::", _error?.message);
        return null;
    }
}

export async function isPackageInstalled(packageName: string): Promise<boolean> {
    try {
        const packageJson: PackageJSON = await Bun.file(`${process.cwd()}/package.json`).json();

        if (packageJson.dependencies?.[packageName]) return true;

        if (packageJson.devDependencies?.[packageName]) return true;

        if (packageJson.peerDependencies?.[packageName]) return true;

        return false;

        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    } catch (error: unknown) {
        let _error;

        if (error instanceof Error)
            _error = error;
        else if (typeof error === "string")
            _error = new Error(error);

        console.error("isPackageInstalled::", _error?.message);
        return false;
    }
}
