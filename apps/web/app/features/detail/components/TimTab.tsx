"use client";
import { useState } from "react";
import type React from "react";
import { NoContent } from "@repo/ui/no-content";
import { TimingBar } from "./TimingBar";
import { TimingTable } from "./TimingTable";

export function TimTab({ data }: { data: any }): React.JSX.Element {
  const { timings, totalTime } = data;
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);

  if (!timings || !totalTime) {
    return <NoContent />;
  }

  return (
    <div className="space-y-4 p-2">
      <p className="font-medium text-gray-700 dark:text-gray-300">
        Total request time:{" "}
        <span className="font-bold">{totalTime.toFixed(2)} ms</span>
      </p>
      <TimingBar
        timings={timings}
        totalTime={totalTime}
        hoveredKey={hoveredKey}
        onHover={setHoveredKey}
      />
      <TimingTable
        timings={timings}
        totalTime={totalTime}
        hoveredKey={hoveredKey}
        onHover={setHoveredKey}
      />
    </div>
  );
}
