import type React from "react";

export interface TimingRow {
  key: string;
  color: string;
  name: string;
  description: string;
  value: number;
  pct: number;
}

export interface TimingTableProps {
  rows: TimingRow[];
  totalTime: number;
  hoveredKey?: string | null;
  onHover?: (key: string | null) => void;
}

export function TimingTable({
  rows,
  totalTime,
  hoveredKey,
  onHover,
}: TimingTableProps): React.JSX.Element {
  return (
    <table className="w-full table-auto">
      <thead>
        <tr className="border-b border-slate-200 dark:border-bunker-600 text-gray-500 dark:text-mirage-400">
          <th className="w-5 py-1 pr-2" />
          <th className="py-1 pr-2 text-left">Phase</th>
          <th className="py-1 pr-2 text-left">Description</th>
          <th className="py-1 pr-2 text-right">Time</th>
          <th className="py-1 text-right">%</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => {
          const isHovered = hoveredKey === row.key;
          const white = isHovered ? "white" : undefined;
          return (
            <tr
              key={row.key}
              className="dark:border-bunker-400 break-all border-b border-slate-100 last:border-none transition-colors duration-200 cursor-pointer hover:bg-slate-50 dark:hover:bg-bunker-800"
              style={{ backgroundColor: isHovered ? "rgba(0,0,0,0.06)" : undefined }}
              onMouseEnter={() => onHover?.(row.key)}
              onMouseLeave={() => onHover?.(null)}
            >
              <td className="py-1 pr-2 align-middle">
                <div
                  className="rounded-sm transition-colors duration-200"
                  style={{ width: 12, height: 12, backgroundColor: row.color }}
                />
              </td>
              <td
                className="py-1 pr-2 align-top font-semibold whitespace-nowrap capitalize dark:text-mirage-200 text-black transition-colors duration-200"
                style={{ color: white }}
              >
                {row.name}
              </td>
              <td
                className="py-1 pr-2 align-top text-gray-900 dark:text-gray-500 transition-colors duration-200"
                style={{ color: white }}
              >
                {row.description}
              </td>
              <td
                className="py-1 pr-2 align-top text-right whitespace-nowrap dark:text-mirage-200 text-black transition-colors duration-200"
                style={{ color: white }}
              >
                {row.value.toFixed(2)} ms
              </td>
              <td
                className="py-1 align-top text-right whitespace-nowrap text-black dark:text-mirage-200 transition-colors duration-200"
                style={{ color: white }}
              >
                {row.pct.toFixed(1)}%
              </td>
            </tr>
          );
        })}
        <tr className="border-t-2 border-slate-300 dark:border-bunker-500 font-bold dark:text-mirage-200">
          <td className="py-1 pr-2" />
          <td className="py-1 pr-2">Total</td>
          <td className="py-1 pr-2 font-normal text-gray-900 dark:text-gray-500">
            Full request/response cycle
          </td>
          <td className="py-1 pr-2 text-right whitespace-nowrap">
            {totalTime.toFixed(2)} ms
          </td>
          <td className="py-1 text-right whitespace-nowrap">100%</td>
        </tr>
      </tbody>
    </table>
  );
}
