import React, { useMemo } from "react";
import { NA } from "@repo/ui/na";
import { useAppStore } from "../../../store/store";
import { selectRawEntry } from "../../../core/selectors";
import { deriveCommonData } from "../helpers/deriveCommonData";
import { Url } from "@repo/ui/url";
import { Method } from "@repo/ui/method";
import { Status } from "@repo/ui/status";
import { getUrlParts } from "../../../core/helpers/getUrlParts";
import { Time } from "./Time";
import { DetailField } from "./DetailField";
import { LineClamp } from "@repo/ui/line-clamp";
import UrlDetailsModal from "./UrlDetailsModal";

export function DetailCommon(): React.JSX.Element | null {
  const rawEntry = useAppStore(selectRawEntry);
  const data = useMemo(() => deriveCommonData(rawEntry), [rawEntry]);

  if (!data) {
    return null;
  }

  const { url, method, status, statusText, httpVersion } = data;
  const { _securityState, time, serverIPAddress } = data;

  const isError = status <= 599 && status >= 400;

  // opaque versions of the selected error list item colors (red tint over the panel background),
  // so the "...More" button can still cover the url text
  const bgClasses = isError
    ? "bg-[#ffeded] dark:bg-[#280e14]"
    : "dark:bg-bunker-500 bg-mirage-50";
  const dividerClasses = isError
    ? "border-red-200 dark:border-[#1c090d]"
    : "border-mirage-100 dark:border-bunker-700";

  return (
    <div className={`${bgClasses} flex flex-1 flex-col gap-1 rounded-md p-2`}>
      <div className="flex gap-2">
        <div className="flex-1" data-search-section="url">
          <LineClamp
            active={url.length > 100}
            classes={isError ? "bg-[#ffeded] dark:bg-[#280e14]!" : bgClasses}
          >
            <DetailField label={"URL:"}>
              <Url {...getUrlParts(url)} />
            </DetailField>
          </LineClamp>
        </div>
        <div>
          <UrlDetailsModal url={url} />
        </div>
      </div>

      <hr className={`${dividerClasses} my-1 border border-b`} />

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
