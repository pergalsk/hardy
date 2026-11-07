import type React from "react";
import type { ResTabData } from "../types";
import { Headers } from "./Headers";
import { Content } from "./Content";

export function ResTab({ data }: { data: ResTabData }): React.JSX.Element {
  return (
    <div className="mr-2 flex flex-col gap-2">
      <div data-search-section="resHeader">
        <Headers data={data} />
      </div>
      <div data-search-section="resBody">
        <Content data={data} searchSection="resBody" />
      </div>
    </div>
  );
}
