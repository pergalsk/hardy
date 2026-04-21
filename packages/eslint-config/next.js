const { resolve } = require("node:path");

const project = resolve(process.cwd(), "tsconfig.json");

/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: [
    "eslint:recommended",
    "prettier",
    "eslint-config-turbo",
  ],
  env: {
    node: true,
    browser: true,
  },
  plugins: ["@next/next", "only-warn"],
  rules: {
    "no-unused-vars": ["warn", { "args": "none" }],
    "@next/next/google-font-display": "warn",
    "@next/next/google-font-preconnect": "warn",
    "@next/next/next-script-for-ga": "warn",
    "@next/next/no-async-client-component": "warn",
    "@next/next/no-before-interactive-script-outside-document": "warn",
    "@next/next/no-css-tags": "warn",
    "@next/next/no-head-element": "warn",
    "@next/next/no-html-link-for-pages": "warn",
    "@next/next/no-img-element": "warn",
    "@next/next/no-page-custom-font": "warn",
    "@next/next/no-styled-jsx-in-document": "warn",
    "@next/next/no-sync-scripts": "warn",
    "@next/next/no-title-in-document-head": "warn",
    "@next/next/no-typos": "warn",
    "@next/next/no-unwanted-polyfillio": "warn",
    "@next/next/inline-script-id": "error",
    "@next/next/no-assign-module-variable": "error",
    "@next/next/no-document-import-in-page": "error",
    "@next/next/no-duplicate-head": "error",
    "@next/next/no-head-import-in-document": "error",
    "@next/next/no-script-component-in-head": "error",
  },
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
  overrides: [{ files: ["*.js?(x)", "*.ts?(x)"] }],
};
