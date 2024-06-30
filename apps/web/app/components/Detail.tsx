import React from "react";
import { DetailSegment } from "./DetailSegment";
import { DetailButtons } from "./DetailButtons";
import { DetailCommon } from "./DetailCommon";
import { Headers, HeaderItem } from "./Headers";
import { formatAsJson } from "../helpers/helpers";
import { NoData } from "./NoData";
import { Collapsible } from "./Collapsible";
import { useAppStore } from "../store/store";
import { selectTab, selectPartsData } from "../store/selectors";

export function Detail(): JSX.Element {
  const tab = useAppStore(selectTab);
  const parts = useAppStore(selectPartsData);

  const headersMap: {
    [key: string]: { headers: HeaderItem[]; content: string };
  } = {
    REQ: {
      headers: parts?.request?.headers,
      content: parts?.request?.content,
    },
    RES: {
      headers: parts?.response?.headers,
      content: parts?.response?.content,
    },
  };

  const partsSelection: { headers: HeaderItem[]; content: string } | null =
    headersMap[tab] || null;

  return (
    <>
      <DetailCommon />
      <DetailButtons />
      <DetailSegment>
        <Collapsible title="Headers">
          {partsSelection?.headers && (
            <Headers headers={partsSelection.headers} />
          )}
        </Collapsible>

        <Collapsible title="Content">
          <div className="text-mirage-200 break-all">
            {partsSelection?.content ? (
              <pre className="overflow-auto whitespace-pre-wrap break-words text-sm">
                {formatAsJson(partsSelection.content)}
              </pre>
            ) : (
              <NoData>No data</NoData>
            )}
          </div>
        </Collapsible>
      </DetailSegment>
    </>
  );
}
