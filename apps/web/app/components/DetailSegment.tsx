import React from "react";

export function DetailSegment({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col h-full overflow-y-auto">{children}</div>;
}
