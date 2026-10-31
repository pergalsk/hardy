import js from "@eslint/js";
import vitest from "@vitest/eslint-plugin";
import prettier from "eslint-config-prettier";
import turbo from "eslint-config-turbo/flat";
import "eslint-plugin-only-warn";
import tseslint from "typescript-eslint";

export const files = ["**/*.{js,jsx,ts,tsx}"];
export const testFiles = ["**/*.test.ts", "**/*.test.tsx"];

/**
 * Shared flat config used by library.js, next.js and react-internal.js.
 * Only *.js, *.jsx, *.ts and *.tsx files are linted (same as old .eslintrc).
 *
 * @param {{ ignores: string[], globals: Record<string, boolean | "readonly" | "writable">, extends?: import("eslint").Linter.Config[] }} options
 * @returns {import("eslint").Linter.Config[]}
 */
export function createConfig({ ignores, globals, extends: extra = [] }) {
  return [
    // Old .eslintrc ignored dotfiles/dotfolders by default and did not lint *.cjs / *.mjs
    { ignores: ["**/.*", "**/*.{cjs,mjs}", ...ignores] },
    { files, ...js.configs.recommended },
    { files, ...prettier },
    ...extra.map((config) => ({ files, ...config })),
    ...turbo.map((config) => ({ files, ...config })),
    {
      files,
      plugins: { "@typescript-eslint": tseslint.plugin },
      languageOptions: {
        parser: tseslint.parser,
        globals,
      },
      rules: {
        "no-unused-vars": "off",
        "@typescript-eslint/no-unused-vars": "warn",
      },
    },
    {
      files: testFiles,
      plugins: { vitest },
      // Same rules as old "plugin:vitest/legacy-recommended"
      rules: {
        "vitest/expect-expect": "error",
        "vitest/no-identical-title": "error",
        "vitest/no-commented-out-tests": "error",
        "vitest/valid-title": "error",
        "vitest/valid-expect": "error",
        "vitest/valid-describe-callback": "error",
        "vitest/require-local-test-context-for-concurrent-snapshots": "error",
        "vitest/no-import-node-test": "error",
      },
    },
  ];
}
