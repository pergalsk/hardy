import type { ReqTabData } from "../types";
import { Headers } from "./Headers";
import { Content } from "./Content";

export function ReqTab({ data }: { data: ReqTabData }) {
  return (
    <div className="mr-2 flex flex-col gap-2">
      <Headers data={data} />
      <Content data={data} />
    </div>
  );
}
