import config from "@repo/eslint-config/react-internal.js";
import { files } from "@repo/eslint-config/base.js";

export default [
  ...config,
  {
    files,
    languageOptions: {
      parserOptions: {
        project: "./tsconfig.lint.json",
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
];
