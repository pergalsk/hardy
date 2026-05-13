"use client";
import { useMemo, useState } from "react";
import type React from "react";
import type { TimTabData } from "../types";
import { NoContent } from "@repo/ui/no-content";
import { buildTimingSegments } from "../helpers/timingSpec";
import { TimingBar } from "./TimingBar";
import { TimingTable } from "./TimingTable";

export function TimTab({ data }: { data: TimTabData }): React.JSX.Element {
  const { timings, totalTime } = data;
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);

  const subToParent = useMemo<Record<string, string>>(() => {
    if (!timings || !totalTime) return {};
    const map: Record<string, string> = {};
    for (const seg of buildTimingSegments(timings, totalTime)) {
      if (seg.subSegment?.key) map[seg.subSegment.key] = seg.key;
    }
    return map;
  }, [timings, totalTime]);

  if (!timings || !totalTime) {
    return <NoContent />;
  }

  const barHoveredKey = hoveredKey ? (subToParent[hoveredKey] ?? hoveredKey) : null;
  const tableHoveredKeys: string[] = hoveredKey
    ? [
        hoveredKey,
        ...(subToParent[hoveredKey] ? [subToParent[hoveredKey]!] : []),
        ...Object.entries(subToParent).filter(([, p]) => p === hoveredKey).map(([c]) => c),
      ]
    : [];

  return (
    <div className="space-y-4 p-2">
      <p className="font-medium text-gray-700 dark:text-gray-300">
        Total request time:{" "}
        <span className="font-bold">{totalTime.toFixed(2)} ms</span>
      </p>
      <TimingBar
        timings={timings}
        totalTime={totalTime}
        hoveredKey={barHoveredKey}
        onHover={setHoveredKey}
      />
      <TimingTable
        timings={timings}
        totalTime={totalTime}
        hoveredKeys={tableHoveredKeys}
        onHover={setHoveredKey}
      />
    </div>
  );
}
