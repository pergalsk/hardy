import type { ReqTabData } from "../types";
import { Headers } from "./Headers";
import { Content } from "./Content";

export function ReqTab({ data }: { data: ReqTabData }) {
  return (
    <div className="mr-2 flex flex-col gap-2">
      <div data-search-section="reqHeader">
        <Headers data={data} />
      </div>
      <div data-search-section="reqBody">
        <Content data={data} searchSection="reqBody" />
      </div>
    </div>
  );
}
