import { Collapsible } from "./Collapsible";
import { Headers } from "./Headers";
import { Content } from "./Content";
import { CollapsibleTitle } from "./CollapsibleTitle";

export function ReqTab({ data }: { data: any }): JSX.Element {
  const { headers, headersSize, content, bodySize } = data;

  const hInfo = headers != null ? headersSize + " b" : "No data";
  const hTitle = <CollapsibleTitle title={"Headers"} info={hInfo} />;

  const cInfo = content != null ? bodySize + " b" : "No data";
  const cTitle = <CollapsibleTitle title={"Content"} info={cInfo} />;

  return (
    <>
      <Collapsible title={hTitle} disabled={!headers}>
        {headers && <Headers headers={headers} />}
      </Collapsible>

      <Collapsible title={cTitle} disabled={!content}>
        <Content data={content} />
      </Collapsible>
    </>
  );
}
