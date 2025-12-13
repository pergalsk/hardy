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
      <div className="text-mirage-700 dark:text-accent-300 border-bunker-700 dark:border-bunker-300 absolute right-0 mb-2 ml-auto flex w-fit items-end justify-end gap-3 rounded-md border p-1.5 px-2 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
        {collapseBtns && (
          <>
            <div
              className={`${"iconify material-symbols--expand-all-rounded"} dark:text-accent-300 my-auto text-lg hover:text-white`}
              onClick={() => {
                setCollapsed(false);
              }}
            ></div>
            <div
              className={`${"iconify material-symbols--collapse-all-rounded"} dark:text-accent-300 my-auto text-lg hover:text-white`}
              onClick={() => {
                setCollapsed(initialJsonViewerSettings.collapsed);
              }}
            ></div>
          </>
        )}

        <div
          className={`${"iconify material-symbols--content-copy-outline-rounded"} dark:text-accent-300 my-auto text-lg hover:text-white`}
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

      <div className="break-all">
        <JsonView
          {...settings}
          value={data}
          style={isDark ? darkStyle : lightStyle}
          collapsed={collapsed}
        />
      </div>
    </div>
  );
}
