import React from "react";
import { useAppStore } from "../store/store";
import { selectCommonData } from "../store/selectors";
import { Url } from "./Url";
import { Method } from "./Method";
import { Status } from "./Status";
import { Time } from "./Time";

export function DetailCommon(): JSX.Element | null {
  const data = useAppStore(selectCommonData);

  if (!data) {
    return null;
  }

  return (
    <div className="bg-mirage-50 dark:bg-bunker-500 flex flex-1 flex-col gap-1 rounded-md p-2">
      <div className="text-mirage-700 dark:text-mirage-200 font-mono">
        <span className="pr-2 font-bold">URL:</span>
        <Url url={data.url} />
      </div>

      <hr className="border-mirage-100 dark:border-bunker-600 my-1 border border-b" />

      <div className="flex">
        <div className="flex flex-1 flex-col">
          <div className="text-mirage-700 dark:text-mirage-200 font-mono">
            <span className="pr-2 font-bold">Method:</span>
            <Method method={data.method} colored={true} />
          </div>

          <div className="text-mirage-700 dark:text-mirage-200 font-mono">
            <span className="pr-2 font-bold">Status:</span>
            <Status
              status={data.status}
              text={data.statusText}
              colored={true}
            />
          </div>
        </div>

        <div className="flex flex-1 flex-col">
          <div className="text-mirage-700 dark:text-mirage-200 font-mono">
            <span className="pr-2 font-bold">Time:</span>
            <Time time={data.time} />
          </div>
          <div className="text-mirage-700 dark:text-mirage-200 font-mono">
            <span className="pr-2 font-bold">Server IP:</span>
            {data.serverIPAddress}
          </div>
        </div>
      </div>
    </div>
  );
}
