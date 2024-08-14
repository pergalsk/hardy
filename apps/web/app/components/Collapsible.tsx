import React, { useState } from "react";

export function Collapsible({
  children,
  title,
  disabled = false,
}: {
  children: any;
  title: string | JSX.Element;
  disabled?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(true);

  const rotation = !disabled && isOpen ? "rotate-270" : "-rotate-90";
  const disabledClasses = disabled
    ? "cursor-default opacity-50"
    : "cursor-pointer hover:bg-mirage-100 dark:hover:bg-bunker-200 dark:hover:text-white";

  return (
    <div>
      <div
        className={`${disabledClasses} bg-mirage-50 text-mirage-700 dark:bg-bunker-500 dark:text-mirage-600 mr-2 flex flex-1 select-none items-center justify-start gap-2 rounded-md p-3 py-1 transition-colors duration-200`}
        onClick={() => !disabled && setIsOpen(!isOpen)}
      >
        <div
          className={`transform transition-transform duration-200 ${rotation}`}
        >
          ▼
        </div>
        <div className="font-bold uppercase">{title}</div>
      </div>
      {!disabled && isOpen && <div className="p-2 pb-0">{children}</div>}
    </div>
  );
}
