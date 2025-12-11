import { Headers } from "./Headers";
import { Content } from "./Content";

export function ResTab({ data }: { data: any }): JSX.Element {
  return (
    <>
      <Headers data={data} />
      <Content data={data} />
    </>
  );
}
