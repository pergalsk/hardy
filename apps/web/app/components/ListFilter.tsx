"use client";

import React from "react";
import { useAppStore } from "../store/store";
import { selectFilter } from "../store/selectors";
import { setFilterFields, clearFilter } from "../store/actions";
import { Filter } from "../store/store";

export function ListFilter() {
  const filter: Filter = useAppStore(selectFilter);

  const { url, status, method } = filter.fields;

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setFilterFields({ ...filter.fields, url });
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const status = e.target.value;
    setFilterFields({ ...filter.fields, status });
  };

  const handleMethodChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const method = e.target.value;
    setFilterFields({ ...filter.fields, method });
  };

  const isFilled: boolean = !!(url.trim() || status.trim() || method.trim());

  const highlightPanelClasses = isFilled
    ? "bg-accent-50 text-black dark:bg-accent-800 dark:text-white"
    : "bg-mirage-50 text-black dark:bg-bunker-500 dark:text-mirage-200";

  const highlightInputClasses = isFilled
    ? "text-black dark:bg-bunker-600 dark:focus:ring-accent-600"
    : "text-black dark:bg-bunker-700 dark:focus:ring-mirage-700";

  const highlightButtonClasses = isFilled
    ? "dark:hover:bg-accent-700 hover:bg-accent-200 dark:hover:text-white"
    : "opacity-50";

  return (
    <div
      className={`${highlightPanelClasses} flex gap-2 rounded-md px-2 py-2 transition-colors duration-200`}
    >
      <div className="flex flex-1 flex-row items-center gap-2 p-0">
        <span className="select-none font-bold">URL</span>
        <input
          type="text"
          className={`${highlightInputClasses} focus:border-accent-800 flex-1 rounded-md px-2 py-1 text-sm text-black transition-colors duration-200 focus:outline-none focus:ring-2 dark:text-white`}
          value={url}
          onChange={handleUrlChange}
        />
      </div>

      <div className="flex flex-1 flex-row items-center gap-2 p-0">
        <span className="select-none font-bold">Status</span>
        <input
          type="text"
          className={`${highlightInputClasses} focus:border-accent-800 flex-1 rounded-md px-2 py-1 text-sm text-black transition-colors duration-200 focus:outline-none focus:ring-2 dark:text-white`}
          value={status}
          onChange={handleStatusChange}
        />
      </div>

      <div className="flex flex-1 flex-row items-center gap-2 p-0">
        <span className="select-none font-bold">Method</span>
        <input
          type="text"
          className={`${highlightInputClasses} focus:border-accent-800 flex-1 rounded-md px-2 py-1 text-sm text-black transition-colors duration-200 focus:outline-none focus:ring-2 dark:text-white`}
          value={method}
          onChange={handleMethodChange}
        />
      </div>

      <button
        className={`${highlightButtonClasses} flex rounded-md p-1 text-xl transition-colors duration-200`}
        onClick={clearFilter}
        disabled={!isFilled}
      >
        <span className="iconify material-symbols--delete-outline-rounded my-auto"></span>
      </button>
    </div>
  );
}
