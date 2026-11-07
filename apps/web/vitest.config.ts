import { configDefaults, defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/test-setup.ts"],
    // Playwright E2E tests run with `npm run test:e2e`
    exclude: [...configDefaults.exclude, "e2e/**"],
    coverage: {
      include: ["app/**/*.tsx"],
      exclude: ["app/layout.tsx", "app/page.tsx", "app/plugins/**"],
    },
  },
});
