import React from "react";

export function DetailSegment({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col justify-center items-center h-full">
      {children}
    </div>
  );
}
