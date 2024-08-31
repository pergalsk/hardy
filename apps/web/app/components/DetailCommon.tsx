import React from "react";
import { useAppStore } from "../store/store";
import { selectCommonData } from "../store/selectors";
import { Url } from "./Url";
import { Method } from "./Method";
import { Status } from "./Status";
import { Time } from "./Time";
import { DetailField } from "./DetailField";
import { useLineClamp } from "../helpers/useLineClamp";

export function DetailCommon(): JSX.Element | null {
  const data = useAppStore(selectCommonData);
  const [ref, isCollapsed] = useLineClamp();

  if (!data) {
    return null;
  }

  const { url, method, status, statusText, httpVersion } = data;
  const { _securityState, time, serverIPAddress } = data;

  return (
    <div className="bg-mirage-50 dark:bg-bunker-500 flex flex-1 flex-col gap-1 rounded-md p-2">
      <div className="relative line-clamp-3" ref={ref}>
        <DetailField label={"URL:"}>
          <Url url={url} />
        </DetailField>
        {isCollapsed ? (
          <button className="dark:text-accent-300 dark:bg-bunker-500 hover:dark:text-accent-100 absolute bottom-0 right-0 inline select-none rounded-sm pl-2 uppercase">
            ...More
          </button>
        ) : null}
      </div>

      <hr className="border-mirage-100 dark:border-bunker-700 my-1 border border-b" />

      <div className="flex text-sm">
        <div className="flex flex-1 flex-col gap-1">
          <DetailField label={"Method:"}>
            <Method method={method} colored={true} />
          </DetailField>

          <DetailField label={"Status:"}>
            <Status status={status} text={statusText} colored={true} />
          </DetailField>
        </div>

        <div className="flex flex-1 flex-col gap-1">
          <DetailField label={"HTTP version:"}>{httpVersion}</DetailField>
          <DetailField label={"Security state:"}>
            {_securityState ?? "N/A"}
          </DetailField>
        </div>

        <div className="flex flex-1 flex-col gap-1">
          <DetailField label={"Time:"}>
            <Time time={time} />
          </DetailField>
          <DetailField label={"Server IP:"}>
            {serverIPAddress ?? "N/A"}
          </DetailField>
        </div>
      </div>
    </div>
  );
}
