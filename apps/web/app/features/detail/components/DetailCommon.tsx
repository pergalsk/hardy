import React, { useMemo } from "react";
import { NA } from "@repo/ui/na";
import { useAppStore } from "../../../store/store";
import { selectRawEntry } from "../../../core/selectors";
import { getCommonData } from "../helpers/detailEntry";
import { Url } from "@repo/ui/url";
import { Method } from "@repo/ui/method";
import { Status } from "@repo/ui/status";
import { getUrlParts } from "../../../core/helpers/getUrlParts";
import { Time } from "./Time";
import { LineClamp } from "@repo/ui/line-clamp";
import UrlDetailsModal from "./UrlDetailsModal";
import { SEARCH_SECTIONS, searchSectionProps } from "../../search/sections";

export function DetailCommon(): React.JSX.Element | null {
  const rawEntry = useAppStore(selectRawEntry);
  const data = useMemo(
    () => (rawEntry ? getCommonData(rawEntry) : null),
    [rawEntry],
  );

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
        <div className="flex-1" {...searchSectionProps(SEARCH_SECTIONS.url)}>
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

function DetailField({
  label,
  children,
}: {
  label: string;
  children?: React.ReactNode;
}): React.JSX.Element {
  return (
    <div className="text-mirage-700 dark:text-mirage-200 font-mono">
      <span className="pr-2 font-bold text-slate-600 dark:text-slate-400">
        {label}
      </span>
      <span className="text-black dark:text-white">{children}</span>
    </div>
  );
}
