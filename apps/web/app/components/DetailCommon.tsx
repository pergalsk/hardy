import React from "react";
import { NA } from "../constants/global";
import { useAppStore } from "../store/store";
import { selectCommonData } from "../store/selectors";
import { Url } from "./Url";
import { Method } from "./Method";
import { Status } from "./Status";
import { Time } from "./Time";
import { DetailField } from "./DetailField";
import { LineClamp } from "./LineClamp";
import UrlDetailsModal from "./UrlDetailsModal";

export function DetailCommon(): JSX.Element | null {
  const data = useAppStore(selectCommonData);

  if (!data) {
    return null;
  }

  const { url, method, status, statusText, httpVersion } = data;
  const { _securityState, time, serverIPAddress } = data;

  return (
    <div className="bg-mirage-50 dark:bg-bunker-500 flex flex-1 flex-col gap-1 rounded-md p-2">
      <div className="flex gap-2">
        <div className="flex-1">
          <LineClamp
            active={url.length > 100}
            classes={"dark:bg-bunker-500 bg-mirage-50"}
          >
            <DetailField label={"URL:"}>
              <Url url={url} />
            </DetailField>
          </LineClamp>
        </div>
        <div>
          <UrlDetailsModal url={url} />
        </div>
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
          <DetailField label={"HTTP version:"}>{httpVersion || NA}</DetailField>
          <DetailField label={"Security state:"}>
            {_securityState || NA}
          </DetailField>
        </div>

        <div className="flex flex-1 flex-col gap-1">
          <DetailField label={"Time:"}>
            <Time time={time} />
          </DetailField>
          <DetailField label={"Server IP:"}>
            {serverIPAddress || NA}
          </DetailField>
        </div>
      </div>
    </div>
  );
}
