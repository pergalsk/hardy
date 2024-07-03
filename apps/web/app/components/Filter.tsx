"use client";
import React from "react";
import { useAppStore } from "../store/store";
import { selectFilter, selectSetFilter } from "../store/selectors";

export function Filter() {
  const filter = useAppStore(selectFilter);
  const setFilter = useAppStore(selectSetFilter);

  const { url, status, method } = filter;

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setFilter({ ...filter, url });
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const status = e.target.value;
    setFilter({ ...filter, status });
  };

  const handleMethodChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const method = e.target.value;
    setFilter({ ...filter, method });
  };

  const isFilled = url.trim() || status.trim() || method.trim();

  const highlightPanelClasses = isFilled
    ? "bg-accent-800 text-white"
    : "bg-bunker-500 text-mirage-200";

  const highlightInputClasses = isFilled
    ? "bg-bunker-600 focus:ring-accent-600"
    : "bg-bunker-700 focus:ring-mirage-700";

  return (
    <div
      className={`${highlightPanelClasses} flex flex-col flex-wrap gap-2 rounded-md px-2 py-2 transition-colors duration-200`}
    >
      <div className="flex flex-row items-center gap-4 p-0">
        <span className="font-bold">URL</span>
        <input
          type="text"
          className={`${highlightInputClasses} focus:border-accent-800 flex-1 rounded-md px-2 py-1 text-sm text-white transition-colors duration-200 focus:outline-none focus:ring-2`}
          value={url}
          onChange={handleUrlChange}
        />
      </div>

      <div className="flex flex-row items-center gap-4 p-0">
        <span className="font-bold">Status</span>
        <input
          type="text"
          className={`${highlightInputClasses} focus:border-accent-800 flex-1 rounded-md px-2 py-1 text-sm text-white transition-colors duration-200 focus:outline-none focus:ring-2`}
          value={status}
          onChange={handleStatusChange}
        />

        <span className="font-bold">Method</span>
        <input
          type="text"
          className={`${highlightInputClasses} focus:border-accent-800 flex-1 rounded-md px-2 py-1 text-sm text-white transition-colors duration-200 focus:outline-none focus:ring-2`}
          value={method}
          onChange={handleMethodChange}
        />
      </div>
    </div>
  );
}
