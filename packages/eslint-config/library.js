import globals from "globals";
import { createConfig } from "./base.js";

/** @type {import("eslint").Linter.Config[]} */
export default createConfig({
  ignores: ["**/node_modules/", "**/dist/", "**/coverage/"],
  globals: {
    ...globals.node,
    React: true,
    JSX: true,
  },
});
