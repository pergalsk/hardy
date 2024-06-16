// import React from "react";
import { DetailSegment } from "./DetailSegment";
import { DetailButtons } from "./DetailButtons";
import { DetailCommon } from "./DetailCommon";
import { MagnifyingGlassSvg } from "./MagnifyingGlassSvg";
import { Headers, HeaderItem } from "./Headers";

interface DetailProps {
  data: any;
  parts: any;
  tab: string;
  onTabChange: (tab: string) => void;
}

export function NoData({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <div className="flex flex-col justify-center items-center h-full">
      <MagnifyingGlassSvg />
      <h1 className="text-lg font-bold uppercase text-center text-mirage-900">
        {children || "No data here"}
      </h1>
    </div>
  );
}

export function Detail(props: DetailProps): JSX.Element {
  const { data, parts, tab, onTabChange } = props;

  const headersMap: { [key: string]: HeaderItem[] } = {
    REQ: parts.request.headers,
    RES: parts.response.headers,
  };

  const headers: HeaderItem[] | null = headersMap[tab] || null;

  return (
    <div className="flex flex-col flex-1 h-full p-2">
      {data ? (
        <>
          <DetailCommon data={data} />
          <DetailButtons tabCode={tab} tabChange={onTabChange} />
          <DetailSegment>
            {headers ? (
              <Headers headers={headers} />
            ) : (
              <NoData>No data here</NoData>
            )}
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
