import type { FrameMasterConfig } from "frame-master/server/types";
import routePlugin from "./";

export default {
	HTTPServer: {
		port: 3000,
	},
	plugins: [
		routePlugin({
			routeOptions: {
				version: 1,
				include: ["/api/*"],
				exclude: ["/*"],
			},
		}),
	],
} satisfies FrameMasterConfig;
