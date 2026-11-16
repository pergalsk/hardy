import type React from "react";
import type { Formatter, HeaderItem } from "@repo/formatter-core";
import { Tooltip } from "@repo/ui/tooltip";

export const HeadersIcons = ({
  formatters,
  setFormatter,
}: {
  formatters: {
    [id: string]: Formatter<HeaderItem>;
  };
  setFormatter: (id: string) => void;
}): React.JSX.Element | null => {
  const formattersList = Object.entries(formatters);
  if (formattersList.length === 0) {
    return null;
  }

  return (
    <span className="dark:text-accent-400 text-accent-600 float-right my-auto ml-2 inline-flex select-none items-center align-top">
      <span className="hidden group-hover:inline">
        {formattersList.map(([id, formatter]) => {
          const { icon, tooltip } = formatter;
          return (
            <Tooltip key={id} content={tooltip}>
              <button
                type="button"
                aria-label={tooltip}
                className="dark:hover:text-accent-100 hover:text-accent-800 ml-1.5"
                onClick={() => setFormatter(id)}
              >
                <span className={`text-lg ${icon}`}></span>
              </button>
            </Tooltip>
          );
        })}
      </span>
      <span>
        <span className="iconify material-symbols--tune-rounded dark:text-accent-400 text-accent-600 text-lg group-hover:hidden"></span>
      </span>
    </span>
  );
};
