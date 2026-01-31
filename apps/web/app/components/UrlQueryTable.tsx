"use client";
import React from "react";

type Props = {
  entries: Array<[string, string]>;
};

export default function UrlQueryTable({ entries }: Props) {
  if (!entries || entries.length === 0) {
    return null;
  }

  return (
    <div className="rounded-md bg-transparent">
      {entries.map(([paramKey, paramValue], index) => {
        const rowHasBorder = index < entries.length - 1;
        const rowClassName = `grid grid-cols-12 py-1 ${
          rowHasBorder ? "border-b border-gray-200 dark:border-slate-700" : ""
        }`;
        return (
          <div key={`${paramKey}-${index}`} className={rowClassName}>
            <div className="text-mirage-700 col-span-4 pr-2 text-sm font-medium dark:text-white">
              {paramKey}
            </div>
            <div className="text-mirage-700 dark:text-mirage-200 col-span-8 break-all pl-2 text-sm">
              <span className="text-mirage-600">=</span> {paramValue}
            </div>
          </div>
        );
      })}
    </div>
  );
}
