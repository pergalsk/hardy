import React from "react";
import { Url } from "./Url";
import { Method } from "./Method";
import { Status } from "./Status";

export function DetailCommon({ data }: { data: any }): JSX.Element {
  return (
    <div className="flex flex-col flex-1 bg-bunker-700 p-2 gap-1 rounded-md">
      <div className="text-mirage-200 font-mono">
        <span className="font-bold pr-2">URL:</span>
        <Url url={data.url} />
      </div>

      <hr className="border-b border border-bunker-600 my-1" />

      <div className="flex">
        <div className="flex flex-col flex-1">
          <div className="text-mirage-200 font-mono">
            <span className="font-bold pr-2">Method:</span>
            <Method method={data.method} colored={true} />
          </div>

          <div className="text-mirage-200 font-mono">
            <span className="font-bold pr-2">Status:</span>
            <Status
              status={data.status}
              text={data.statusText}
              colored={true}
            />
          </div>
        </div>

        <div className="flex flex-col flex-1">
          <div className="text-mirage-200 font-mono">
            <span className="font-bold pr-2">Time:</span>
            {data.time.toFixed(2)} ms
          </div>
          <div className="text-mirage-200 font-mono">
            <span className="font-bold pr-2">Server IP:</span>
            {data.serverIPAddress}
          </div>
        </div>
      </div>
    </div>
  );
}
