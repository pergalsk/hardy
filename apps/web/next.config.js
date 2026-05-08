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
    "@repo/plugin-user-agent-raw",
    "@repo/plugin-headers-plain",
  ],
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline'",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data:",
              "font-src 'self'",
              "connect-src 'self'",
              "frame-ancestors 'none'",
            ].join("; "),
          },
        ],
      },
    ];
  },
};
