import type React from "react";
import { TimingTable as TimingTableUI } from "@repo/ui/timing-table";
import { buildTimingRows } from "../helpers/timingSpec";

export interface TimingTableProps {
  timings: Record<string, number>;
  totalTime: number;
  hoveredKey?: string | null;
  onHover?: (key: string | null) => void;
}

export function TimingTable({
  timings,
  totalTime,
  hoveredKey,
  onHover,
}: TimingTableProps): React.JSX.Element {
  const rows = buildTimingRows(timings, totalTime);
  return (
    <TimingTableUI
      rows={rows}
      totalTime={totalTime}
      hoveredKey={hoveredKey}
      onHover={onHover}
    />
  );
}
