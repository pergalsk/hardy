import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react-oxc";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/test-setup.ts"],
    coverage: {
      include: ["app/**/*.tsx"],
      exclude: ["app/layout.tsx", "app/page.tsx", "app/plugins/**"],
    },
  },
});
