import React from "react";
import { useAppStore } from "../store/store";
import {
  selectFiles,
  selectFilterActive,
  selectSettings,
  selectSortingActive,
} from "../store/selectors";
import {
  clearFilter,
  clearSorting,
  setFilterActive,
  setShowPages,
  setSortingActive,
} from "../store/actions";
import { Navigation } from "./Navigation";
import { Logo } from "./Logo";
import { FileTabs } from "./FileTabs";
import { Settings } from "./Settings";

export function Header(): JSX.Element {
  const files = useAppStore(selectFiles);
  const filterActive = useAppStore(selectFilterActive);
  const sortingActive = useAppStore(selectSortingActive);
  const { showPages } = useAppStore(selectSettings);

  const handleFilterActive = () => {
    setFilterActive(!filterActive);
    clearFilter();
  };

  const handleSortingActive = () => {
    setSortingActive(!sortingActive);
    clearSorting();
  };

  const handleShowPages = () => {
    setShowPages(!showPages);
  };

  return (
    <Navigation>
      <Logo />
      <FileTabs />

      <div className="ml-auto w-0"></div>

      {files.length > 0 && (
        <>
          <div className="ml-auto flex items-center gap-3">
            <div
              className={`${sortingActive ? "dark:text-accent-500 dark:hover:text-accent-300" : "dark:bg-slate-400 dark:hover:bg-slate-300"} iconify material-symbols--sort-rounded hover:text-accent-600 my-auto text-xl`}
              onClick={handleSortingActive}
            ></div>
            <div
              className={`${filterActive ? "dark:text-accent-500 dark:hover:text-accent-300" : "dark:bg-slate-400 dark:hover:bg-slate-300"} iconify material-symbols--filter-alt-outline hover:text-accent-600 my-auto text-xl`}
              onClick={handleFilterActive}
            ></div>
            <div
              className={`${showPages ? "dark:text-accent-500 dark:hover:text-accent-300" : "dark:bg-slate-400 dark:hover:bg-slate-300"} iconify material-symbols--note-stack-outline hover:text-accent-600 my-auto text-xl`}
              onClick={handleShowPages}
            ></div>
          </div>
          <div className="border-bunker-900 ml-3 mr-1 h-6 w-0 border-r"></div>
        </>
      )}

      <Settings />
    </Navigation>
  );
}
