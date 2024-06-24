import React from "react";
import { TabCode, useAppStore } from "../store/store";

interface Tab {
  code: TabCode;
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

export function DetailButtons(): JSX.Element {
  const tabCode = useAppStore((state) => state.ui.tab);
  const setTab = useAppStore((state) => state.setTab);

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
            className={`${activeClasses} text-mirage-200 rounded-md px-4 py-1 font-bold uppercase transition-colors duration-200`}
            onClick={() => setTab(tab.code)}
          >
            {tab.name}
          </button>
        );
      })}
    </div>
  );
}
