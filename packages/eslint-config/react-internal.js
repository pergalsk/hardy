import globals from "globals";
import { createConfig } from "./base.js";

/*
 * This is a custom ESLint configuration for use with
 * internal (bundled by their consumer) libraries
 * that utilize React.
 */

/** @type {import("eslint").Linter.Config[]} */
export default createConfig({
  ignores: ["**/node_modules/", "**/dist/", "**/coverage/"],
  globals: {
    ...globals.browser,
  },
});
