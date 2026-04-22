import React, { useMemo } from "react";
import { useAppStore } from "../store/store";
import { selectTab, selectRawEntry } from "../store/selectors";
import { deriveTabData } from "../helpers/helpers";
import { DetailCommon } from "./DetailCommon";
import { DetailButtons } from "./DetailButtons";
import { DetailSegment } from "./DetailSegment";
import { ReqTab } from "./ReqTab";
import { ResTab } from "./ResTab";
import { CooTab } from "./CooTab";
import { TimTab } from "./TimTab";

export function Detail(): React.JSX.Element {
  const tab = useAppStore(selectTab);
  const rawEntry = useAppStore(selectRawEntry);
  const tabData = useMemo(() => deriveTabData(rawEntry, tab), [rawEntry, tab]);

  return (
    <>
      <DetailCommon />
      <DetailButtons />
      <DetailSegment>
        {tab === "REQ" && <ReqTab data={tabData} />}
        {tab === "RES" && <ResTab data={tabData} />}
        {tab === "COO" && <CooTab data={tabData} />}
        {tab === "TIM" && <TimTab data={tabData} />}
      </DetailSegment>
    </>
  );
}
