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

  const { url, method, status, statusText, httpVersion } = data;
  const { _securityState, time, serverIPAddress } = data;

  return (
    <div className="bg-mirage-50 dark:bg-bunker-500 flex flex-1 flex-col gap-1 rounded-md p-2">
      <div className="text-mirage-700 dark:text-mirage-200 font-mono">
        <span className="pr-2 font-bold">URL:</span>
        <Url url={url} />
      </div>

      <hr className="border-mirage-100 dark:border-bunker-600 my-1 border border-b" />

      <div className="flex text-sm">
        <div className="flex flex-1 flex-col">
          <div className="text-mirage-700 dark:text-mirage-200 font-mono">
            <span className="pr-2 font-bold">Method:</span>
            <Method method={method} colored={true} />
          </div>

          <div className="text-mirage-700 dark:text-mirage-200 font-mono">
            <span className="pr-2 font-bold">Status:</span>
            <Status status={status} text={statusText} colored={true} />
          </div>
        </div>

        <div className="flex flex-1 flex-col">
          <div className="text-mirage-700 dark:text-mirage-200 font-mono">
            <span className="pr-2 font-bold">HTTP version:</span>
            <span className="text-white">{httpVersion}</span>
          </div>
          <div className="text-mirage-700 dark:text-mirage-200 font-mono">
            <span className="pr-2 font-bold">Security state:</span>
            <span className="text-white">{_securityState ?? "N/A"}</span>
          </div>
        </div>

        <div className="flex flex-1 flex-col">
          <div className="text-mirage-700 dark:text-mirage-200 font-mono">
            <span className="pr-2 font-bold">Time:</span>
            <span className="text-white">
              <Time time={time} />
            </span>
          </div>
          <div className="text-mirage-700 dark:text-mirage-200 font-mono">
            <span className="pr-2 font-bold">Server IP:</span>
            <span className="text-white">{serverIPAddress}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
