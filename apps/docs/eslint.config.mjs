import config from "@repo/eslint-config/next.js";
import { files } from "@repo/eslint-config/base.js";

export default [
  ...config,
  {
    files,
    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
];
