import type React from "react";
import { TimingBar as TimingBarUI } from "@repo/ui/timing-bar";
import { buildTimingSegments } from "../helpers/timingSpec";

export interface TimingBarProps {
  timings: Record<string, number>;
  totalTime: number;
  hoveredKey?: string | null;
  onHover?: (key: string | null) => void;
}

export function TimingBar({
  timings,
  totalTime,
  hoveredKey,
  onHover,
}: TimingBarProps): React.JSX.Element | null {
  const segments = buildTimingSegments(timings, totalTime);
  return (
    <TimingBarUI segments={segments} hoveredKey={hoveredKey} onHover={onHover} />
  );
}
