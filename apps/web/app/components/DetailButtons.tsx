import React from "react";
import { TabCode, useAppStore } from "../store/store";
import { selectTab } from "../store/selectors";
import { setTab } from "../store/actions";

interface Tab {
  code: TabCode;
  name: string;
  active: boolean;
  icon: string;
  action: () => void;
}

const tabsDef: Tab[] = [
  {
    code: "REQ",
    name: "Request",
    icon: "material-symbols--arrow-upward-alt-rounded",
    active: false,
    action: () => {},
  },
  {
    code: "RES",
    name: "Response",
    icon: "material-symbols--arrow-downward-alt-rounded",
    active: false,
    action: () => {},
  },
  {
    code: "COO",
    name: "Cookies",
    icon: "material-symbols--cookie-outline-rounded",
    active: false,
    action: () => {},
  },
  {
    code: "TIM",
    name: "Timing",
    icon: "material-symbols--timer-outline-rounded",
    active: false,
    action: () => {},
  },
];

export function DetailButtons(): JSX.Element {
  const tabCode = useAppStore(selectTab);

  return (
    <div className="flex gap-2">
      {tabsDef.map((tab) => {
        const activeClasses =
          tab.code === tabCode
            ? "bg-accent-100 text-mirage-700 dark:bg-accent-700 dark:text-white dark:hover:bg-accent-600 hover:bg-accent-300"
            : "bg-mirage-50 text-mirage-700 dark:text-mirage-300 dark:bg-bunker-500 hover:bg-mirage-100 dark:hover:text-white dark:hover:bg-bunker-200";

        return (
          <button
            key={tab.name}
            className={`${activeClasses} text-mirage-200 flex select-none justify-center rounded-md py-1 pl-2 pr-3 align-middle font-bold uppercase transition-colors duration-200`}
            onClick={() => setTab(tab.code)}
          >
            <span className={`iconify ${tab.icon} my-auto mr-2 text-xl`}></span>
            {tab.name}
          </button>
        );
      })}
    </div>
  );
}
