import React, { useMemo, useRef } from "react";
import { useAppStore } from "../../../store/store";
import { selectTab } from "../selectors";
import { selectRawEntry } from "../../../core/selectors";
import { getTabData } from "../helpers/detailEntry";
import { DetailCommon } from "./DetailCommon";
import { DetailButtons } from "./DetailButtons";
import { MessageTab } from "./MessageTab";
import { CooTab } from "./CooTab";
import { TimTab } from "./TimTab";
import { useSearchHighlight } from "../../search/hooks/useSearchHighlight";
import { SEARCH_SECTIONS } from "../../search/sections";

export function Detail(): React.JSX.Element {
  const tab = useAppStore(selectTab);
  const rawEntry = useAppStore(selectRawEntry);
  const tabData = useMemo(
    () => (rawEntry ? getTabData(rawEntry, tab) : null),
    [rawEntry, tab],
  );
  const rootRef = useRef<HTMLDivElement>(null);
  useSearchHighlight(rootRef);

  return (
    <div ref={rootRef} className="contents">
      <DetailCommon />
      <DetailButtons />
      <div className="flex h-full flex-col gap-2 overflow-y-auto">
        {tabData?.tab === "REQ" && (
          <MessageTab
            data={tabData.data}
            headerSection={SEARCH_SECTIONS.reqHeader}
            bodySection={SEARCH_SECTIONS.reqBody}
          />
        )}
        {tabData?.tab === "RES" && (
          <MessageTab
            data={tabData.data}
            headerSection={SEARCH_SECTIONS.resHeader}
            bodySection={SEARCH_SECTIONS.resBody}
          />
        )}
        {tabData?.tab === "COO" && <CooTab data={tabData.data} />}
        {tabData?.tab === "TIM" && <TimTab data={tabData.data} />}
      </div>
    </div>
  );
}
