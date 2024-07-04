import React from "react";
import { useAppStore } from "../store/store";
import { selectTab, selectTabData } from "../store/selectors";
import { DetailCommon } from "./DetailCommon";
import { DetailButtons } from "./DetailButtons";
import { DetailSegment } from "./DetailSegment";
import { ReqTab } from "./ReqTab";
import { ResTab } from "./ResTab";
import { CooTab } from "./CooTab";
import { TimTab } from "./TimTab";

export function Detail(): JSX.Element {
  const tab = useAppStore(selectTab);
  const tabData = useAppStore(selectTabData(tab));

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
