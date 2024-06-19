// import React from "react";
import { DetailSegment } from "./DetailSegment";
import { DetailButtons } from "./DetailButtons";
import { DetailCommon } from "./DetailCommon";
import { Headers, HeaderItem } from "./Headers";
import { formatAsJson } from "../helpers/helpers";
import { NoData } from "./NoData";

interface DetailProps {
  data: any;
  parts: any;
  tab: string;
  onTabChange: (tab: string) => void;
}

export function Detail(props: DetailProps): JSX.Element {
  const { data, parts, tab, onTabChange } = props;

  const headersMap: {
    [key: string]: { headers: HeaderItem[]; content: string };
  } = {
    REQ: {
      headers: parts.request.headers,
      content: parts.request.content,
    },
    RES: {
      headers: parts.response.headers,
      content: parts.response.content,
    },
  };

  const partsSelection: { headers: HeaderItem[]; content: string } | null =
    headersMap[tab] || null;

  return (
    <div className="flex flex-col flex-1 h-full p-2">
      {data ? (
        <>
          <DetailCommon data={data} />
          <DetailButtons tabCode={tab} tabChange={onTabChange} />
          <DetailSegment>
            {partsSelection?.headers && (
              <Headers headers={partsSelection.headers} />
            )}
            <hr className="border-b border-bunker-700 mt-3" />
            <div className="pt-2 break-all text-mirage-200">
              {partsSelection?.content ? (
                <>
                  <div className="font-bold pb-2 uppercase">Content</div>
                  <pre className="text-sm">
                    {formatAsJson(partsSelection.content)}
                  </pre>
                </>
              ) : (
                <NoData>No data</NoData>
              )}
            </div>
          </DetailSegment>
        </>
      ) : (
        <DetailSegment>
          <NoData>Select a request</NoData>
        </DetailSegment>
      )}
    </div>
  );
}
