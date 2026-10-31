// This configuration only applies to the package manager root.
import config from "@repo/eslint-config/library.js";
import { files } from "@repo/eslint-config/base.js";

export default [
  { ignores: ["apps/**", "packages/**"] },
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
