"use client";
import { useEffect, useId, useRef, useState } from "react";
import type React from "react";

export interface TimingSegment {
  key: string;
  color: string;
  name: string;
  value: number;
  pct: number;
  widthPct: number;
  leftPct: number;
  subSegment?: {
    color: string;
    widthPct: number;
  };
}

export interface TimingBarProps {
  segments: TimingSegment[];
  hoveredKey?: string | null;
  onHover?: (key: string | null) => void;
}

const BAR_H = 32;
const BAR_RADIUS = 6;
const ROW_SPACING = 30;
const TOP_PAD = 4;
const LABEL_AREA = 190;
const LABEL_GAP = 10;
const MIN_SEG_PX = 5;

function computePixelLayout(segments: TimingSegment[], barW: number) {
  const natural = segments.map((seg) => (seg.widthPct / 100) * barW);
  const atMin = natural.map((w) => w < MIN_SEG_PX);
  const minReserved = atMin.filter(Boolean).length * MIN_SEG_PX;
  const remaining = Math.max(0, barW - minReserved);
  const largeSum = natural.reduce((sum, w, i) => (atMin[i] ? sum : sum + w), 0);

  const widths = natural.map((w, i) =>
    atMin[i] ? MIN_SEG_PX : largeSum > 0 ? (w / largeSum) * remaining : 0,
  );

  let cumX = 0;
  return segments.map((seg, i) => {
    const x = cumX;
    const w = widths[i] ?? MIN_SEG_PX;
    cumX += w;
    return { ...seg, x, w };
  });
}

export function TimingBar({
  segments,
  hoveredKey,
  onHover,
}: TimingBarProps): React.JSX.Element | null {
  const uid = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const update = () => setWidth(el.getBoundingClientRect().width);
    const ro = new ResizeObserver(update);
    ro.observe(el);
    update();
    return () => ro.disconnect();
  }, []);

  if (segments.length === 0) return null;

  const n = segments.length;
  const barW = Math.max(0, width - LABEL_AREA);
  const svgH = TOP_PAD + BAR_H + (n + 0.5) * ROW_SPACING;
  const barY = TOP_PAD;
  const anyHovered = hoveredKey != null;
  const rowY = (i: number) => barY + BAR_H + (n - i) * ROW_SPACING;
  const layout = width > 0 ? computePixelLayout(segments, barW) : [];

  return (
    <div ref={containerRef} className="w-full">
      {width > 0 && (
        <svg width={width} height={svgH} className="block overflow-visible">
          <defs>
            <clipPath id={`bar-${uid}`}>
              <rect x={0} y={barY} width={barW} height={BAR_H} rx={BAR_RADIUS} />
            </clipPath>
          </defs>

          {/* Bar segments */}
          <g clipPath={`url(#bar-${uid})`}>
            {layout.map((seg) => {
              const dimmed = anyHovered && hoveredKey !== seg.key;
              return (
                <g
                  key={seg.key}
                  style={{ cursor: "pointer", opacity: dimmed ? 0.45 : 1, transition: "opacity 0.2s" }}
                  onMouseEnter={() => onHover?.(seg.key)}
                  onMouseLeave={() => onHover?.(null)}
                >
                  <rect x={seg.x} y={barY} width={seg.w} height={BAR_H} fill={seg.color} />
                  {seg.subSegment && (
                    <rect
                      x={seg.x + seg.w - (seg.subSegment.widthPct / 100) * seg.w}
                      y={barY}
                      width={(seg.subSegment.widthPct / 100) * seg.w}
                      height={BAR_H}
                      fill={seg.subSegment.color}
                    />
                  )}
                </g>
              );
            })}
          </g>

          {/* Connectors and labels */}
          {layout.map((seg, i) => {
            const centerX = seg.x + seg.w / 2;
            const ly = rowY(i);
            const dimmed = anyHovered && hoveredKey !== seg.key;

            return (
              <g
                key={`c-${seg.key}`}
                style={{ cursor: "pointer", opacity: dimmed ? 0.45 : 1, transition: "opacity 0.2s" }}
                onMouseEnter={() => onHover?.(seg.key)}
                onMouseLeave={() => onHover?.(null)}
              >
                {/* Invisible hit area covering bar rect + full connector column */}
                <rect
                  x={seg.x}
                  y={barY}
                  width={Math.max(seg.w, 8)}
                  height={ly - barY}
                  fillOpacity={0}
                  pointerEvents="all"
                />
                <line x1={centerX} y1={barY + BAR_H} x2={centerX} y2={ly} stroke={seg.color} strokeWidth="1.5" />
                <line x1={centerX} y1={ly} x2={barW} y2={ly} stroke={seg.color} strokeWidth="1.5" />
                <text
                  x={barW + LABEL_GAP}
                  y={ly}
                  dy="0.35em"
                  style={{ fill: seg.color, fontSize: 14, fontFamily: "inherit", fontWeight: 500 }}
                >
                  {seg.name} · {seg.value.toFixed(2)} ms
                </text>
              </g>
            );
          })}
        </svg>
      )}
    </div>
  );
}
