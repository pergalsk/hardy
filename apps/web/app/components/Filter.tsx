"use client";
import React from "react";
import { useAppStore, selectFilter, selectSetFilter } from "../store/store";

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

  const highlightClasses =
    url.trim() || status.trim() || method.trim()
      ? "bg-accent-950"
      : "bg-bunker-500";

  return (
    <div
      className={`${highlightClasses} text-mirage-200 flex flex-col flex-wrap gap-2 rounded-md px-2 py-2 transition-colors duration-200`}
    >
      <div className="flex flex-row items-center gap-4 p-0">
        <span className="font-bold">URL</span>
        <input
          type="text"
          className="bg-bunker-700 flex-1 rounded-md px-2 py-1 text-sm text-white"
          value={url}
          onChange={handleUrlChange}
        />
      </div>

      <div className="flex flex-row items-center gap-4 p-0">
        <span className="font-bold">Status</span>
        <input
          type="text"
          className="bg-bunker-700 flex-1 rounded-md px-2 py-1 text-sm text-white"
          value={status}
          onChange={handleStatusChange}
        />

        <span className="font-bold">Method</span>
        <input
          type="text"
          className="bg-bunker-700 flex-1 rounded-md px-2 py-1 text-sm text-white"
          value={method}
          onChange={handleMethodChange}
        />
      </div>
    </div>
  );
}
