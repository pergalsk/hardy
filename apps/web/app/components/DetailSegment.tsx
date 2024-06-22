import React from "react";

export function DetailSegment({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full flex-col gap-2 overflow-y-auto">{children}</div>
  );
}
