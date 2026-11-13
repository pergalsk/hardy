import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./test-setup.ts"],
    coverage: {
      provider: "v8",
      reporter: ["text-summary", "json-summary", "lcov"],
      include: ["src/**/*.{ts,tsx}"],
      exclude: ["**/*.test.{ts,tsx}", "**/test-setup.ts", "**/types.ts"],
      thresholds: {
        lines: 57,
        statements: 57,
        functions: 49,
        branches: 61,
      },
    },
  },
});
