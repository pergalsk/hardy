/** @type {import('next').NextConfig} */
module.exports = {
  transpilePackages: ["@repo/ui", "@repo/formatter-core", "@repo/formatter-ui"],
  output: "export",
};
