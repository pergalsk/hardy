import React from "react";

export function DetailCommon({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <div className="flex flex-col flex-1 bg-bunker-800 p-4 gap-2">
      {children}
    </div>
  );
}
