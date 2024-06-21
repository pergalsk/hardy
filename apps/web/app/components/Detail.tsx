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
    <div className="flex h-1/2 w-full flex-none flex-col p-2 lg:h-full lg:w-1/2">
      {data ? (
        <>
          <DetailCommon data={data} />
          <DetailButtons tabCode={tab} tabChange={onTabChange} />
          <DetailSegment>
            {partsSelection?.headers && (
              <Headers headers={partsSelection.headers} />
            )}
            <div className="text-mirage-200 break-all pt-2">
              {partsSelection?.content ? (
                <>
                  <div className="pb-2 font-bold uppercase">Content</div>
                  <pre className="overflow-auto whitespace-pre-wrap break-words text-sm">
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
