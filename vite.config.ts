import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
  vite: {
    resolve: {
      alias: [
        {
          find: /^use-sync-external-store\/shim\/with-selector(\.js)?$/,
          replacement: resolve(__dirname, "src/lib/use-sync-external-store-with-selector.ts"),
        },
      ],
    },
    optimizeDeps: {
      include: [
        "@tanstack/react-store",
        "use-sync-external-store",
        "use-sync-external-store/shim",
      ],
    },
  },
});
