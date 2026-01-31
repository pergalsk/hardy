import React, { useState } from "react";
import { ToggleMark } from "./ToggleMark";
import { Formatter } from "../providers/Formatter";

export function Collapsible({
  children,
  title,
  handler,
  initOpen = true,
  transparent = false,
  disabled = false,
  active = true,
  sticky = true,
  actions = null,
  activeActionId = "",
  onAction = () => {},
}: {
  children: any;
  title?: string | JSX.Element;
  handler?: JSX.Element;
  initOpen?: boolean;
  transparent?: boolean;
  disabled?: boolean;
  active?: boolean;
  sticky?: boolean;
  actions?: { [id: string]: Formatter<any> } | null;
  activeActionId?: string;
  onAction?: (id: string) => void;
}) {
  const [opened, setOpened] = useState(initOpen);

  if (!active) {
    return <div>{children}</div>;
  }

  const disabledClasses = disabled
    ? "opacity-50"
    : "group-hover:bg-mirage-100 dark:group-hover:bg-bunker-200 dark:group-hover:text-white";

  const actionList = actions
    ? Object.entries(actions).map(([id, { icon }]) => (
        <div
          key={id}
          className={`${icon} ${activeActionId === id ? "text-accent-600 dark:text-accent-300" : ""} hover:text-accent-500 my-auto text-lg dark:hover:text-white`}
          onClick={() => onAction(id)}
        ></div>
      ))
    : null;

  return (
    <div>
      {handler ? (
        <div onClick={() => !disabled && setOpened(!opened)}>
          {React.cloneElement(handler, { opened: opened })}
        </div>
      ) : (
        <div
          className={`${sticky ? "sticky top-0 z-10 drop-shadow-lg" : ""} dark:bg-bunker-950 group flex bg-white`}
        >
          <div
            className={`${disabledClasses} ${transparent ? "bg-transparent" : "bg-mirage-50 dark:bg-bunker-500"} text-mirage-700 dark:text-mirage-300 flex flex-1 select-none justify-start gap-2 rounded-md p-3 py-1.5 pl-2 transition-colors duration-200`}
            onClick={() => !disabled && setOpened(!opened)}
          >
            <ToggleMark opened={opened && !disabled} />
            <div className="w-full">{title}</div>
          </div>

          {!disabled && opened && actionList && (
            <div className="bg-mirage-50 text-mirage-700 group-hover:bg-mirage-100 dark:bg-mirage-900 dark:group-hover:bg-mirage-800 ml-2 flex gap-3 rounded-md p-1 px-2 transition-colors duration-200">
              {actionList}
            </div>
          )}
        </div>
      )}

      {!disabled && opened && <div className="pt-2">{children}</div>}
    </div>
  );
}
