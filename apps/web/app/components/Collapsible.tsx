import React, { useState } from "react";

export function Collapsible({
  children,
  title,
}: {
  children: any;
  title: string;
}) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="border-mirage-400">
      <div
        className="bg-bunker-700 text-mirage-600 hover:bg-bunker-600 mr-2 flex flex-1 cursor-pointer items-center justify-start gap-2 rounded-md p-3 py-1 transition-colors duration-200"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div>{isOpen ? "▲" : "▼"}</div>
        <div className="font-bold uppercase">{title}</div>
      </div>
      {isOpen && <div className="p-2">{children}</div>}
    </div>
  );
}
