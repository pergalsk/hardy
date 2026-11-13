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
      provider: "v8",
      reporter: ["text-summary", "json-summary", "lcov"],
      include: ["app/**/*.{ts,tsx}"],
      exclude: [
        "app/layout.tsx",
        "app/page.tsx",
        "app/plugins/**",
        "**/*.test.{ts,tsx}",
        "**/types.ts",
      ],
      thresholds: {
        lines: 77,
        statements: 75,
        functions: 65,
        branches: 64,
      },
    },
  },
});
