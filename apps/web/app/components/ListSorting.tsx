import React from "react";
import { useAppStore } from "../store/store";
import { selectSorting } from "../store/selectors";
import { setSorting, clearSorting, setSortInsidePages } from "../store/actions";
import Button from "./Button";
import ToggleSwitch from "./ToggleSwitch";

const FIELDS: {
  key: "url" | "status" | "method" | "time" | "pageref";
  label: string;
  icon?: string;
}[] = [
  {
    key: "url",
    label: "URL",
    icon: "material-symbols--arrow-cool-down-rounded",
  },
  {
    key: "status",
    label: "Status",
    icon: "material-symbols--arrow-cool-down-rounded",
  },
  {
    key: "method",
    label: "Method",
    icon: "material-symbols--arrow-warm-up-rounded",
  },
  {
    key: "time",
    label: "Time",
    icon: "material-symbols--arrow-cool-down-rounded",
  },
  {
    key: "pageref",
    label: "Page",
    icon: "material-symbols--arrow-cool-down-rounded",
  },
];

export function ListSorting() {
  const { sortDir, sortBy, sortInsidePages } = useAppStore(selectSorting);
  const isActive = Boolean(sortBy);

  const onFieldClick = (key: (typeof FIELDS)[number]["key"]) => setSorting(key);
  const onToggleInsidePages = (checked: boolean) => setSortInsidePages(checked);
  const onResetSorting = () => clearSorting();

  const panelClasses = isActive
    ? "bg-accent-700 text-white dark:bg-accent-800 dark:text-white"
    : "bg-mirage-50 text-black dark:bg-bunker-500 dark:text-mirage-200";

  const buttonHoverClasses = isActive
    ? "dark:hover:bg-accent-700 hover:bg-accent-800 dark:hover:text-white"
    : "opacity-25";

  const iconClasses = isActive
    ? "dark:text-accent-100 text-accent-100"
    : "dark:text-accent-100 text-accent-800";

  return (
    <div
      className={`${panelClasses} flex select-none items-center gap-2 rounded-md px-2 py-1.5 transition-colors duration-200`}
    >
      <div className={`${iconClasses} flex select-none rounded-md p-1 text-xl`}>
        <span className="iconify material-symbols--sort-rounded my-auto" />
      </div>

      <div className="ml-1 uppercase">Sort by</div>

      <div className="flex flex-1 items-center justify-center gap-4">
        {FIELDS.map(({ key, label }) => {
          const fieldIsActive = sortBy === key;
          const variant = fieldIsActive ? "primary" : "flat";

          const icon = fieldIsActive
            ? sortDir === "asc"
              ? "iconify material-symbols--arrow-upward-rounded"
              : "iconify material-symbols--arrow-downward-rounded"
            : "";

          return (
            <Button
              key={key}
              variant={variant as any}
              icon={icon}
              size="nr"
              onClick={() => onFieldClick(key)}
              className="flex items-center gap-2 py-0"
            >
              {label}
            </Button>
          );
        })}
      </div>

      <div className="flex items-center gap-2">
        <div
          className={`${isActive ? "" : "opacity-40"} mt-0.5 text-sm uppercase`}
        >
          Keep pages
        </div>
        <ToggleSwitch
          checked={!!sortInsidePages}
          disabled={!isActive}
          onChange={onToggleInsidePages}
        />
      </div>

      <button
        className={`${buttonHoverClasses} flex rounded-md p-1 text-xl`}
        onClick={onResetSorting}
        disabled={!isActive}
      >
        <span className="iconify material-symbols--delete-outline-rounded my-auto" />
      </button>
    </div>
  );
}
