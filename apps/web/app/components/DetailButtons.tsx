import React, { useState, useEffect } from "react";

interface Tab {
  code: string;
  name: string;
  active: boolean;
  action: () => void;
}

const tabsDef: Tab[] = [
  { code: "REQ", name: "Request", active: false, action: () => {} },
  { code: "RES", name: "Response", active: false, action: () => {} },
  { code: "COO", name: "Cookies", active: false, action: () => {} },
  { code: "TIM", name: "Timing", active: false, action: () => {} },
];

export function DetailButtons({
  tabCode,
  tabChange,
}: {
  tabCode: string;
  tabChange: (tab: string) => void;
}) {
  return (
    <div className="flex gap-2 py-2">
      {tabsDef.map((tab) => {
        const activeClasses =
          tab.code === tabCode
            ? "bg-accent-800"
            : "bg-bunker-500 hover:bg-bunker-300";

        return (
          <button
            key={tab.name}
            className={`${activeClasses} px-4 py-1 text-mirage-200 font-bold rounded-md  transition-colors duration-200 uppercase`}
            onClick={() => tabChange(tab.code)}
          >
            {tab.name}
          </button>
        );
      })}
    </div>
  );
}
