import { Headers } from "./Headers";
import { Content } from "./Content";

export function ReqTab({ data }: { data: any }) {
  return (
    <div className="mr-2 flex flex-col gap-2">
      <Headers data={data} />
      <Content data={data} />
    </div>
  );
}
