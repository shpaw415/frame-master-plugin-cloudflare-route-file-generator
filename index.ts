import type { FrameMasterPlugin } from "frame-master/plugin/types";
import { name, version as packageVersion } from "./package.json";
import { join } from "frame-master/utils";

export type CloudflareRouteFile = {
	/**
	 * The version of the route file format. This is used to ensure compatibility with different versions of the route file format.
	 * @note **2026/05/07** current version is 1
	 */
	version: number;
	include: string[];
	exclude: string[];
};

export type CloudflareRouteFileGeneratorOptions = {
	routeOptions:
		| ((
				config: Bun.BuildConfig,
				output: Bun.BuildOutput,
		  ) => CloudflareRouteFile)
		| CloudflareRouteFile;
};

/**
 * cloudflare-route-file-generator - Frame-Master Plugin
 *
 * @description Generate a `_routes.json` in your build output that can be used with Cloudflare Pages to define which routes should be handled by Cloudflare and which should be handled by your application.
 */
export default function cloudflareroutefilegenerator(
	params: CloudflareRouteFileGeneratorOptions,
): FrameMasterPlugin {
	const { routeOptions } = params;
	const cwd = process.cwd();

	return {
		name,
		version: packageVersion,

		build: {
			async afterBuild(conf, res) {
				const file = new File(
					[
						JSON.stringify(
							typeof routeOptions === "function"
								? routeOptions(conf, res)
								: routeOptions,
							null,
							2,
						),
					],
					"_routes.json",
					{
						type: "application/json",
					},
				);
				const path = join(cwd, conf.outdir as string, "_routes.json");
				res.outputs.push({
					...file,
					path,
					loader: "file",
					hash: Bun.hash(await file.arrayBuffer()).toString(),
					kind: "entry-point",
					sourcemap: null,
				});

				await Bun.file(path).write(await file.arrayBuffer());
			},
		},

		requirement: {
			frameMasterVersion: "^3.0.0",
			bunVersion: ">=1.3.0",
		},
	};
}
