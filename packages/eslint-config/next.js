const { resolve } = require("node:path");

const project = resolve(process.cwd(), "tsconfig.json");

/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: [
    "eslint:recommended",
    "prettier",
    "plugin:@next/next/recommended-legacy",
    "eslint-config-turbo",
  ],
  env: {
    node: true,
    browser: true,
  },
  plugins: ["only-warn", "@typescript-eslint"],
  settings: {
    "import/resolver": {
      typescript: {
        project,
      },
    },
  },
  ignorePatterns: [
    ".*.js",
    "node_modules/",
    "out/",
  ],
  rules: {
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": "warn",
  },
  overrides: [{ files: ["*.js?(x)", "*.ts?(x)"] }],
};
