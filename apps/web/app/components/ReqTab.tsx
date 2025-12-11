import { Headers } from "./Headers";
import { Content } from "./Content";

export function ReqTab({ data }: { data: any }) {
  return (
    <>
      <Headers data={data} />
      <Content data={data} />
    </>
  );
}
