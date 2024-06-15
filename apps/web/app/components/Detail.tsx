// import React from "react";
import { DetailSegment } from "./DetailSegment";
import { DetailButtons } from "./DetailButtons";
import { DetailCommon } from "./DetailCommon";
import { MagnifyingGlassSvg } from "./MagnifyingGlassSvg";

export function Detail({ data }: { data: any }): JSX.Element {
  return (
    <div className="flex flex-col flex-1 h-full p-2">
      {data ? (
        <>
          <DetailCommon data={data} />
          <DetailButtons />
          <DetailSegment>
            <MagnifyingGlassSvg />
            <h1 className="text-lg font-bold uppercase text-center text-mirage-900">
              Detail here
            </h1>
          </DetailSegment>
        </>
      ) : (
        <DetailSegment>
          <MagnifyingGlassSvg />
          <h1 className="text-lg font-bold uppercase text-center text-mirage-900">
            Select a request
          </h1>
        </DetailSegment>
      )}
    </div>
  );
}
