// Prints a Markdown table with coverage of every workspace package and a merged total.
// Reads `coverage/coverage-summary.json` written by `npm run test:coverage`.
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const metrics = ["lines", "statements", "functions", "branches"];
const rows = [];
const total = Object.fromEntries(metrics.map((m) => [m, { covered: 0, total: 0 }]));

for (const dir of ["apps", "packages"]) {
  if (!existsSync(dir)) continue;
  for (const name of readdirSync(dir).sort()) {
    const file = join(dir, name, "coverage", "coverage-summary.json");
    if (!existsSync(file)) continue;
    const summary = JSON.parse(readFileSync(file, "utf8")).total;
    rows.push([`${dir}/${name}`, ...metrics.map((m) => `${summary[m].pct}%`)]);
    for (const m of metrics) {
      total[m].covered += summary[m].covered;
      total[m].total += summary[m].total;
    }
  }
}

if (rows.length === 0) {
  console.log("## Coverage\n\nNo coverage reports found.");
  process.exit(0);
}

const pct = ({ covered, total }) =>
  total === 0 ? "100%" : `${Math.round((covered / total) * 10000) / 100}%`;
rows.push(["**Total**", ...metrics.map((m) => `**${pct(total[m])}**`)]);

console.log("## Coverage\n");
console.log(`| Package | ${metrics.map((m) => m[0].toUpperCase() + m.slice(1)).join(" | ")} |`);
console.log(`|---|${metrics.map(() => "---:").join("|")}|`);
for (const row of rows) console.log(`| ${row.join(" | ")} |`);
