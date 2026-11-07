import React, { useMemo, useRef } from "react";
import type { ReqTabData, ResTabData, CooTabData, TimTabData } from "../types";
import { useAppStore } from "../../../store/store";
import { selectTab } from "../selectors";
import { selectRawEntry } from "../../../core/selectors";
import { deriveTabData } from "../helpers/deriveTabData";
import { DetailCommon } from "./DetailCommon";
import { DetailButtons } from "./DetailButtons";
import { DetailSegment } from "./DetailSegment";
import { ReqTab } from "./ReqTab";
import { ResTab } from "./ResTab";
import { CooTab } from "./CooTab";
import { TimTab } from "./TimTab";
import { useSearchHighlight } from "../../search/hooks/useSearchHighlight";

export function Detail(): React.JSX.Element {
  const tab = useAppStore(selectTab);
  const rawEntry = useAppStore(selectRawEntry);
  const tabData = useMemo(() => deriveTabData(rawEntry, tab), [rawEntry, tab]);
  const rootRef = useRef<HTMLDivElement>(null);
  useSearchHighlight(rootRef);

  return (
    <div ref={rootRef} className="contents">
      <DetailCommon />
      <DetailButtons />
      <DetailSegment>
        {tab === "REQ" && tabData && <ReqTab data={tabData as ReqTabData} />}
        {tab === "RES" && tabData && <ResTab data={tabData as ResTabData} />}
        {tab === "COO" && tabData && <CooTab data={tabData as CooTabData} />}
        {tab === "TIM" && tabData && <TimTab data={tabData as TimTabData} />}
      </DetailSegment>
    </div>
  );
}
