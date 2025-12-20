import React, { useState } from "react";
import { ToggleMark } from "./ToggleMark";
import { Formatter, ContentValue } from "../providers/contentValueFormatter";

export function Collapsible({
  children,
  title,
  disabled = false,
  actions = null,
  activeActionId = "",
  onAction = () => {},
}: {
  children: any;
  title: string | JSX.Element;
  disabled?: boolean;
  actions?: { [id: string]: Formatter<any> } | null;
  activeActionId?: string;
  onAction?: (id: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(true);

  const disabledClasses = disabled
    ? "opacity-50"
    : "group-hover:bg-mirage-100 dark:group-hover:bg-bunker-200 dark:group-hover:text-white";

  const actionList = actions
    ? Object.entries(actions).map(([id, { icon }]) => (
        <div
          key={id}
          className={`${icon} ${activeActionId === id ? "dark:text-accent-300" : ""} my-auto text-lg hover:text-white`}
          onClick={() => onAction(id)}
        ></div>
      ))
    : null;

  return (
    <div>
      <div className="dark:bg-bunker-950 group sticky top-0 z-10 flex bg-white">
        <div
          className={`${disabledClasses} bg-mirage-50 text-mirage-700 dark:bg-bunker-500 dark:text-mirage-300 mr-2 flex flex-1 select-none items-center justify-start gap-2 rounded-md p-3 py-1.5 pl-2 transition-colors duration-200`}
          onClick={() => !disabled && setIsOpen(!isOpen)}
        >
          <ToggleMark opened={isOpen && !disabled} />
          <div className="w-full">{title}</div>
        </div>

        {!disabled && isOpen && actionList && (
          <div className="text-mirage-300 bg-mirage-50 dark:bg-mirage-900 dark:group-hover:bg-mirage-800 mr-2 flex gap-3 rounded-md p-1 px-2 transition-colors duration-200">
            {actionList}
          </div>
        )}
      </div>

      {!disabled && isOpen && <div className="p-2 pb-0">{children}</div>}
    </div>
  );
}
