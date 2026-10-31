import nextPlugin from "@next/eslint-plugin-next";
import globals from "globals";
import { createConfig } from "./base.js";

/** @type {import("eslint").Linter.Config[]} */
export default createConfig({
  ignores: ["**/node_modules/", "**/out/", "**/coverage/"],
  globals: {
    ...globals.node,
    ...globals.browser,
  },
  extends: [nextPlugin.configs.recommended],
});
