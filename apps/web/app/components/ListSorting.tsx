import React from "react";
import { useAppStore } from "../store/store";
import { selectSorting } from "../store/selectors";
import { setSorting, clearSorting, setSortInsidePages } from "../store/actions";
import ListSortingBtn from "./ListSortingBtn";
import KeepPagesToggle from "./KeepPagesToggle";
import ResetSortingBtn from "./ResetSortingBtn";

type SortKey = "url" | "status" | "method" | "time" | "pageref";

const SORT_FIELDS: { key: SortKey; label: string }[] = [
  { key: "url", label: "URL" },
  { key: "status", label: "Status" },
  { key: "method", label: "Method" },
  { key: "time", label: "Time" },
  { key: "pageref", label: "Page" },
];

export function ListSorting() {
  const { sortDir, sortBy, sortInsidePages } = useAppStore(selectSorting);
  const isActive = Boolean(sortBy);

  const onFieldClick = (sortKey: SortKey) => setSorting(sortKey);
  const onToggleInsidePages = (checked: boolean) => setSortInsidePages(checked);
  const onResetSorting = () => clearSorting();

  const panelClasses = isActive
    ? "bg-accent-700 text-white dark:bg-accent-800 dark:text-white"
    : "bg-mirage-50 text-black dark:bg-bunker-500 dark:text-mirage-200";

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
        {SORT_FIELDS.map(({ key, label }) => (
          <ListSortingBtn
            key={key}
            sortKey={key}
            label={label}
            isSelected={sortBy === key}
            sortDir={sortDir}
            onClick={onFieldClick}
          />
        ))}
      </div>

      <KeepPagesToggle
        isActive={isActive}
        checked={Boolean(sortInsidePages)}
        onChange={onToggleInsidePages}
      />

      <ResetSortingBtn isActive={isActive} onClick={onResetSorting} />
    </div>
  );
}
