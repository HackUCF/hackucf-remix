import {
  cloudflareDevProxyVitePlugin,
  vitePlugin as remix,
} from "@remix-run/dev";
import { defineConfig } from "vite";
import { envOnlyMacros } from "vite-env-only";
import tsconfigPaths from "vite-tsconfig-paths";

import type { Env } from "./context";

// Augment Remix's Future interface for Single Fetch type inference
declare module "@remix-run/cloudflare" {
  interface Future {
    v3_singleFetch: true;
  }
}

export default defineConfig({
  plugins: [
    envOnlyMacros(),
    tsconfigPaths(),
    cloudflareDevProxyVitePlugin<Env, CfProperties>({
      getLoadContext: async ({
        context: {
          cloudflare: { env },
        },
      }) => {
        const { getLoadContext } = await import("./context");
        return getLoadContext(env);
      },
    }),
    remix({
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
        v3_lazyRouteDiscovery: true,
        v3_singleFetch: true,
      },
    }),
  ],
});
