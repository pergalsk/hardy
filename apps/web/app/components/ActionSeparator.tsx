import React from "react";

export function ActionSeparator({
  type = "line",
}: {
  type?: "line" | "space";
}) {
  if (type === "space") return <div className="mx-auto w-0" aria-hidden />;
  return (
    <div className="border-bunker-900 mx-3 h-6 w-0 border-r" aria-hidden />
  );
}
