// import React from "react";
import { DetailSegment } from "./DetailSegment";
import { DetailButtons } from "./DetailButtons";
import { ValueList } from "./ValueList";
import { DetailCommon } from "./DetailCommon";
import { MagnifyingGlassSvg } from "./MagnifyingGlassSvg";

export function Detail(): JSX.Element {
  const data = [
    {
      label: "URL",
      value:
        "https://stackoverflow.com/questions/61343447/my-just-isnt-working-on-my-vscode",
    },
    { label: "Method", value: "GET" },
    { label: "Code", value: "404 Not Found" },
    { label: "IP address", value: "192.168.1.152" },
  ];

  return (
    <div className="flex flex-col flex-1 h-full">
      <DetailCommon>
        <ValueList data={data} />
      </DetailCommon>

      <DetailButtons />

      <DetailSegment>
        <MagnifyingGlassSvg />

        <h1 className="text-lg font-bold uppercase text-center text-mirage-900">
          request detail
        </h1>
      </DetailSegment>
    </div>
  );
}
