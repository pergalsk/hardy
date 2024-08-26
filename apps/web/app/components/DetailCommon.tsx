import React from "react";
import { useAppStore } from "../store/store";
import { selectCommonData } from "../store/selectors";
import { Url } from "./Url";
import { Method } from "./Method";
import { Status } from "./Status";
import { Time } from "./Time";
import { DetailField } from "./DetailField";

export function DetailCommon(): JSX.Element | null {
  const data = useAppStore(selectCommonData);

  if (!data) {
    return null;
  }

  const { url, method, status, statusText, httpVersion } = data;
  const { _securityState, time, serverIPAddress } = data;

  return (
    <div className="bg-mirage-50 dark:bg-bunker-500 flex flex-1 flex-col gap-1 rounded-md p-2">
      <DetailField label={"URL:"}>
        <Url url={url} />
      </DetailField>

      <hr className="border-mirage-100 dark:border-bunker-600 my-1 border border-b" />

      <div className="flex text-sm">
        <div className="flex flex-1 flex-col">
          <DetailField label={"Method:"}>
            <Method method={method} colored={true} />
          </DetailField>

          <DetailField label={"Status:"}>
            <Status status={status} text={statusText} colored={true} />
          </DetailField>
        </div>

        <div className="flex flex-1 flex-col">
          <DetailField label={"HTTP version:"}>{httpVersion}</DetailField>
          <DetailField label={"Security state:"}>
            {_securityState ?? "N/A"}
          </DetailField>
        </div>

        <div className="flex flex-1 flex-col">
          <DetailField label={"Time:"}>
            <Time time={time} />
          </DetailField>
          <DetailField label={"Server IP:"}>{serverIPAddress}</DetailField>
        </div>
      </div>
    </div>
  );
}
