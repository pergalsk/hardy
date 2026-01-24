import React from "react";

export function ActionBar({
  children,
  alignRight = false,
}: {
  children: React.ReactNode;
  alignRight?: boolean;
}) {
  const base = "flex flex-1 select-none items-center gap-3";
  const alignClass = alignRight ? "ml-auto" : "mr-auto";
  const className = `${base} ${alignClass}`.trim();

  return <div className={className}>{children}</div>;
}
