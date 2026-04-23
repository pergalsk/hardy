import React from "react";

export function ActionText({ children }: { children: React.ReactNode }) {
  return (
    <span className="mt-0.5 text-sm uppercase text-slate-500 dark:text-slate-500">
      {children}
    </span>
  );
}
