"use client";
import React, { useRef, useState } from "react";

type Props = {
  left: React.ReactNode;
  right: React.ReactNode;
  initialLeftPercent?: number;
  minLeftPercent?: number;
  maxLeftPercent?: number;
};

export default function SplitPanels({
  left,
  right,
  initialLeftPercent = 50,
  minLeftPercent = 25,
  maxLeftPercent = 75,
}: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [leftPercent, setLeftPercent] = useState<number>(initialLeftPercent);
  const [isDragging, setIsDragging] = useState(false);
  const [isHoveringDivider, setIsHoveringDivider] = useState(false);

  const resetToCenter = () => {
    setLeftPercent(50);
  };

  const startDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    const containerNode = containerRef.current;
    if (!containerNode) return;

    event.currentTarget.setPointerCapture(event.pointerId);
    setIsDragging(true);

    const onMove = (moveEvent: PointerEvent) => {
      const rect = containerNode.getBoundingClientRect();
      const x = moveEvent.clientX - rect.left;
      let nextPercent = (x / rect.width) * 100;
      if (nextPercent < minLeftPercent) nextPercent = minLeftPercent;
      if (nextPercent > maxLeftPercent) nextPercent = maxLeftPercent;
      setLeftPercent(nextPercent);
    };

    const onUp = () => {
      setIsDragging(false);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
  };

  const dividerBase =
    "w-[5px] cursor-ew-resize bg-bunker-600 transition-colors duration-150 border-l-[2px] border-r-[2px] border-bunker-950";
  const dividerHover =
    "bg-slate-200 dark:bg-bunker-500 border-slate-200 dark:border-bunker-500";
  const dividerActive =
    "bg-slate-300 dark:bg-bunker-500 border-slate-300 dark:border-bunker-500";

  const dividerClassName = `${dividerBase} ${
    isDragging ? dividerActive : isHoveringDivider ? dividerHover : ""
  }`;

  return (
    <div ref={containerRef} className="flex h-full w-full items-stretch">
      <div
        style={{ flexBasis: `${leftPercent}%`, flexGrow: 0, flexShrink: 0 }}
        className="h-full min-w-0"
      >
        {left}
      </div>

      <div
        role="separator"
        aria-orientation="vertical"
        onPointerDown={startDrag}
        onDoubleClick={resetToCenter}
        onPointerEnter={() => setIsHoveringDivider(true)}
        onPointerLeave={() => setIsHoveringDivider(false)}
        className={dividerClassName}
        style={{ touchAction: "none" }}
      />

      <div style={{ flex: 1, minWidth: 0 }} className="h-full min-w-0">
        {right}
      </div>
    </div>
  );
}
