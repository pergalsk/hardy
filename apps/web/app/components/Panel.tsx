"use client";
import React from "react";

export function Panel({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <div className="bg-bunker-950 border-thin border-bunker-700 flex h-1/2 w-full flex-none flex-col gap-2 overflow-auto border-r p-2 lg:h-full lg:w-1/2">
      {children}
    </div>
  );
}
