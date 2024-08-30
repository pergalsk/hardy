import React, { useState } from "react";
import { ToggleMark } from "./ToggleMark";

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

  const disabledClasses = disabled
    ? "opacity-50"
    : "hover:bg-mirage-100 dark:hover:bg-bunker-200 dark:hover:text-white";

  return (
    <div>
      <div className="flex">
        <div
          className={`${disabledClasses} bg-mirage-50 text-mirage-700 dark:bg-bunker-500 dark:text-mirage-300 mr-2 flex flex-1 select-none items-center justify-start gap-2 rounded-md p-3 py-1.5 pl-2 transition-colors duration-200`}
          onClick={() => !disabled && setIsOpen(!isOpen)}
        >
          <ToggleMark opened={isOpen && !disabled} />
          <div className="w-full">{title}</div>
        </div>
        {/* <div className="text-mirage-700 bg-mirage-50 dark:text-mirage-500 mr-2 flex gap-2 rounded-md p-1 px-[0.375rem] transition-colors duration-200 dark:bg-transparent">
          <div className="iconify material-symbols--code-rounded hover:text-accent-700 my-auto text-xl"></div>
          <div className="iconify material-symbols--image-search-rounded hover:text-accent-700 my-auto text-xl"></div>
          <div className="iconify material-symbols--close-fullscreen-rounded hover:text-accent-700 my-auto rotate-90 text-xl"></div>
          <div className="iconify material-symbols--open-in-full-rounded hover:text-accent-700 my-auto rotate-90 text-xl"></div>
          <div className="iconify material-symbols--content-copy-outline-rounded hover:text-accent-700 my-auto text-xl"></div>
        </div> */}
      </div>
      {!disabled && isOpen && <div className="p-2 pb-0">{children}</div>}
    </div>
  );
}
