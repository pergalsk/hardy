"use client";

import React from "react";
import { useAppStore } from "../store/store";
import { selectFilter } from "../store/selectors";
import { setFilterFields } from "../store/actions";
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

  const isFilled = url.trim() || status.trim() || method.trim();

  const highlightPanelClasses = isFilled
    ? "bg-accent-50 text-black dark:bg-accent-800 dark:text-white"
    : "bg-mirage-50 text-black dark:bg-bunker-500 dark:text-mirage-200";

  const highlightInputClasses = isFilled
    ? "text-black dark:bg-bunker-600 dark:focus:ring-accent-600"
    : "text-black dark:bg-bunker-700 dark:focus:ring-mirage-700";

  return (
    <div
      className={`${highlightPanelClasses} flex flex-col flex-wrap gap-2 rounded-md px-2 py-2 transition-colors duration-200`}
    >
      <div className="flex flex-row items-center gap-4 p-0">
        <span className="font-bold">URL</span>
        <input
          type="text"
          className={`${highlightInputClasses} focus:border-accent-800 flex-1 rounded-md px-2 py-1 text-sm text-black transition-colors duration-200 focus:outline-none focus:ring-2 dark:text-white`}
          value={url}
          onChange={handleUrlChange}
        />
      </div>

      <div className="flex flex-row items-center gap-4 p-0">
        <span className="font-bold">Status</span>
        <input
          type="text"
          className={`${highlightInputClasses} focus:border-accent-800 flex-1 rounded-md px-2 py-1 text-sm text-black transition-colors duration-200 focus:outline-none focus:ring-2 dark:text-white`}
          value={status}
          onChange={handleStatusChange}
        />

        <span className="font-bold">Method</span>
        <input
          type="text"
          className={`${highlightInputClasses} focus:border-accent-800 flex-1 rounded-md px-2 py-1 text-sm text-black transition-colors duration-200 focus:outline-none focus:ring-2 dark:text-white`}
          value={method}
          onChange={handleMethodChange}
        />
      </div>
    </div>
  );
}
