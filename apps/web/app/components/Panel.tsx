"use client";
import React from "react";

export function Panel({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <div className="dark:bg-bunker-950 border-thin dark:border-bunker-100 flex h-full w-full flex-col gap-2 overflow-auto border-r border-slate-200 p-2 last:border-r-0">
      {children}
    </div>
  );
}
