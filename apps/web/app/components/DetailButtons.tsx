import React from "react";
import { TabCode, useAppStore } from "../store/store";
import { selectTab, selectSetTab } from "../store/selectors";

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
  const tabCode = useAppStore(selectTab);
  const setTab = useAppStore(selectSetTab);

  return (
    <div className="flex gap-2">
      {tabsDef.map((tab) => {
        const activeClasses =
          tab.code === tabCode
            ? "bg-accent-700 text-white hover:bg-accent-600"
            : "bg-bunker-500 hover:text-white hover:bg-bunker-200";

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
