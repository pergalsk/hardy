"use client";
import React from "react";

export function Panel({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element {
  return (
    <div className="dark:bg-bunker-950 flex h-full w-full flex-col gap-2 overflow-auto p-2">
      {children}
    </div>
  );
}
