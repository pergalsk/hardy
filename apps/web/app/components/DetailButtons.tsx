import React from "react";
import { TabCode, useAppStore } from "../store/store";
import { selectTab } from "../store/selectors";
import { setTab } from "../store/actions";

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

  return (
    <div className="flex gap-2">
      {tabsDef.map((tab) => {
        const activeClasses =
          tab.code === tabCode
            ? "bg-accent-100 text-mirage-700 dark:bg-accent-700 dark:text-white dark:hover:bg-accent-600 hover:bg-accent-300"
            : "bg-mirage-50 text-mirage-700 dark:bg-bunker-500 hover:bg-mirage-100 dark:hover:text-white dark:hover:bg-bunker-200";

        return (
          <button
            key={tab.name}
            className={`${activeClasses} text-mirage-200 select-none rounded-md px-4 py-1 font-bold uppercase transition-colors duration-200`}
            onClick={() => setTab(tab.code)}
          >
            {tab.name}
          </button>
        );
      })}
    </div>
  );
}
