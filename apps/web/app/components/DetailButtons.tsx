"use client";

import React, { useState } from "react";

interface Tab {
  code: string;
  name: string;
  active: boolean;
  action: () => void;
}

const tabsDef: Tab[] = [
  { code: "REQ", name: "Request", active: true, action: () => {} },
  { code: "RES", name: "Response", active: false, action: () => {} },
  { code: "COO", name: "Cookies", active: false, action: () => {} },
  { code: "TIM", name: "Timing", active: false, action: () => {} },
];

export function DetailButtons() {
  const [tabs, setTabs] = useState(tabsDef);

  const onClickFn = (selectedTab: Tab) => {
    return () => {
      const updatedTabs = tabs.map((tab) => {
        return { ...tab, active: tab.code === selectedTab.code };
      });
      setTabs(updatedTabs);
      selectedTab.action();
    };
  };

  return (
    <div className="flex gap-2 py-2">
      {tabs.map((tab) => {
        const activeClasses = tab.active
          ? "bg-accent-800"
          : "bg-bunker-500 hover:bg-bunker-300";

        return (
          <button
            key={tab.name}
            className={`${activeClasses} px-4 py-1 text-mirage-200 font-bold rounded-md  transition-colors duration-200 uppercase`}
            onClick={onClickFn(tab)}
          >
            {tab.name}
          </button>
        );
      })}
    </div>
  );
}
