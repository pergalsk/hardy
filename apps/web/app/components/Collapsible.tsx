import React, { useState } from "react";

export function Collapsible({
  children,
  title,
}: {
  children: any;
  title: string;
}) {
  const [isOpen, setIsOpen] = useState(true);
  const rotation = isOpen ? "rotate-270" : "-rotate-90";

  return (
    <div className="border-mirage-400">
      <div
        className="bg-mirage-50 text-mirage-700 dark:bg-bunker-700 dark:text-mirage-600 hover:bg-mirage-100 dark:hover:bg-bunker-600 mr-2 flex flex-1 cursor-pointer items-center justify-start gap-2 rounded-md p-3 py-1 transition-colors duration-200"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div
          className={`transform transition-transform duration-200 ${rotation}`}
        >
          ▼
        </div>
        <div className="select-none font-bold uppercase">{title}</div>
      </div>
      {isOpen && <div className="p-2 pb-0">{children}</div>}
    </div>
  );
}
