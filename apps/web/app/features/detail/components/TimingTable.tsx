import type React from "react";
import { TimingTable as TimingTableUI } from "@repo/ui/timing-table";
import { buildTimingRows } from "../helpers/timingSpec";

export interface TimingTableProps {
  timings: Record<string, number>;
  totalTime: number;
  hoveredKeys?: string[];
  onHover?: (key: string | null) => void;
}

export function TimingTable({
  timings,
  totalTime,
  hoveredKeys,
  onHover,
}: TimingTableProps): React.JSX.Element {
  const rows = buildTimingRows(timings, totalTime);
  return (
    <TimingTableUI
      rows={rows}
      totalTime={totalTime}
      hoveredKeys={hoveredKeys}
      onHover={onHover}
    />
  );
}
