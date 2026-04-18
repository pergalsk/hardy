/** @type {import('next').NextConfig} */
module.exports = {
  transpilePackages: [
    "@repo/ui",
    "@repo/formatter-core",
    "@repo/formatter-ui",
    "@repo/plugin-json-raw",
    "@repo/plugin-json-pretty",
    "@repo/plugin-headers-table",
    "@repo/plugin-headers-raw",
    "@repo/plugin-user-agent-parse",
  ],
  output: "export",
};
