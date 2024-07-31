import { Collapsible } from "./Collapsible";
import { Headers } from "./Headers";
import { Content } from "./Content";

export function ResTab({ data }: { data: any }): JSX.Element {
  const { headers, content } = data;

  return (
    <>
      <Collapsible title="Headers">
        {headers && <Headers headers={headers} />}
      </Collapsible>

      <Collapsible title="Content">
        <Content data={content} />
      </Collapsible>
    </>
  );
}
