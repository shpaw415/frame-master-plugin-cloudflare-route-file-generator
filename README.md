# cloudflare-route-file-generator

A [Frame-Master](https://github.com/frame-master) plugin that generates a `_routes.json` file in your build output for use with [Cloudflare Pages](https://developers.cloudflare.com/pages/configuration/file-based-routing/). This file tells Cloudflare which routes should be handled by your Worker and which should be served as static assets.

## Requirements

- `frame-master` `^3.0.0`
- `bun` `>=1.3.0`

## Installation

```bash
bun add frame-master-plugin-cloudflare-route-file-generator
```

## Usage

Add the plugin to your `frame-master.config.ts`:

```typescript
import type { FrameMasterConfig } from "frame-master/server/types";
import cloudflareroutefilegenerator from "frame-master-plugin-cloudflare-route-file-generator";

const config: FrameMasterConfig = {
  HTTPServer: { port: 3000 },
  plugins: [
    cloudflareroutefilegenerator({
      routeOptions: {
        version: 1,
        include: ["/*"],
        exclude: ["/assets/*"],
      },
    }),
  ],
};

export default config;
```

After a build, a `_routes.json` file will be written to your output directory automatically.

## Options

### `CloudflareRouteFileGeneratorOptions`

| Property       | Type                  | Description                                        |
| -------------- | --------------------- | -------------------------------------------------- |
| `routeOptions` | `CloudflareRouteFile` | The contents of the generated `_routes.json` file. |

### `CloudflareRouteFile`

| Property  | Type       | Description                                                                |
| --------- | ---------- | -------------------------------------------------------------------------- |
| `version` | `number`   | Route file format version. Current version is `1`.                         |
| `include` | `string[]` | URL patterns that should be handled by your Cloudflare Worker.             |
| `exclude` | `string[]` | URL patterns that should be served as static assets, bypassing the Worker. |

## How It Works

During the `afterBuild` hook, the plugin serializes your `routeOptions` to JSON and writes a `_routes.json` file into the configured output directory. The file is also added to the build result's `outputs` list so Frame-Master is aware of it.

## License

MIT
