import JsonView from "@uiw/react-json-view";
import { useAppStore, initialJsonViewerSettings } from "../store/store";
import { addToast } from "../store/actions";
import { selectJsonViewerSettings } from "../store/selectors";
import { useDarkMode } from "../helpers/useDarkMode";
import { useState } from "react";

import { darkStyle, lightStyle } from "../constants/jsonViewer";

export function JsonContent({
  data,
  collapseBtns = true,
}: {
  data: any;
  collapseBtns?: boolean;
}): JSX.Element {
  const settings = useAppStore(selectJsonViewerSettings);
  const isDark = useDarkMode();
  const [collapsed, setCollapsed] = useState<boolean | number>(
    initialJsonViewerSettings.collapsed,
  );

  return (
    // Add group so children can react to hover on the container
    <div className="group relative flex h-full flex-col">
      {/* Icons panel: hidden by default, visible on hover of the container */}
      <div className="text-mirage-500 dark:bg-bunker-800 dark:text-mirage-400 sticky right-0 top-10 z-10 mb-2 ml-auto flex w-fit items-end justify-end gap-3 rounded-md bg-slate-100 p-1.5 px-2 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
        {collapseBtns && (
          <>
            <div
              className={`${"iconify material-symbols--expand-all-rounded"} hover:text-accent-600 my-auto text-lg dark:hover:text-white`}
              onClick={() => {
                setCollapsed(false);
              }}
            ></div>
            <div
              className={`${"iconify material-symbols--collapse-all-rounded"} hover:text-accent-600 my-auto text-lg dark:hover:text-white`}
              onClick={() => {
                setCollapsed(initialJsonViewerSettings.collapsed);
              }}
            ></div>
          </>
        )}

        <div
          className={`${"iconify material-symbols--content-copy-outline-rounded"} hover:text-accent-600 my-auto text-lg dark:hover:text-white`}
          onClick={() => {
            navigator.clipboard
              .writeText(JSON.stringify(data, null, 2))
              .then(() => {
                addToast({
                  type: "alert",
                  message: <div>JSON copied to clipboard!</div>,
                });
              })
              .catch((err) => {
                console.error("Failed to copy to clipboard:", err);
              });
          }}
        ></div>
      </div>

      <div className="relative top-[-36px]">
        <div className="break-all">
          <JsonView
            {...settings}
            value={data}
            style={isDark ? darkStyle : lightStyle}
            collapsed={collapsed}
          />
        </div>
      </div>
    </div>
  );
}
