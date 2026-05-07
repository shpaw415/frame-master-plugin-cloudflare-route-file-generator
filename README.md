# cloudflare-route-file-generator

Frame-Master plugin

## Installation

```bash
bun add cloudflare-route-file-generator
```

## Usage

```typescript
import type { FrameMasterConfig } from "frame-master/server/types";
import cloudflareroutefilegenerator from "cloudflare-route-file-generator";

const config: FrameMasterConfig = {
  HTTPServer: { port: 3000 },
  plugins: [cloudflareroutefilegenerator()],
};

export default config;
```

## Features

- Feature 1
- Feature 2

## License

MIT

```

```
