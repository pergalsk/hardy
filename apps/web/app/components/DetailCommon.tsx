import React from "react";
import { Url } from "./Url";
import { Method } from "./Method";
import { Status } from "./Status";

export function DetailCommon({ data }: { data: any }): JSX.Element {
  return (
    <div className="flex flex-col flex-1 bg-bunker-700 p-2 gap-2 rounded-md">
      <div className="text-mirage-200 font-mono">
        <span className="font-bold pr-2">URL:</span>
        <Url url={data.url} />
      </div>
      <div className="text-mirage-200 font-mono">
        <span className="font-bold pr-2">Method:</span>
        <Method method={data.method} colored={true} />
      </div>
      <div className="text-mirage-200 font-mono">
        <span className="font-bold pr-2">Status:</span>
        <Status status={data.status} colored={true} />
      </div>
      <div className="text-mirage-200 font-mono">
        <span className="font-bold pr-2">Server IP:</span>
        {data.serverIPAddress}
      </div>
    </div>
  );
}
