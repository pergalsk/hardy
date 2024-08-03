import { Collapsible } from "./Collapsible";
import { Headers } from "./Headers";
import { Content } from "./Content";

export function ReqTab({ data }: { data: any }): JSX.Element {
  const { headers, content } = data;

  const headersTitle = `Headers${headers ? "" : " / No data"}`;
  const contentTitle = `Content${content ? "" : " / No data"}`;

  return (
    <>
      <Collapsible title={headersTitle} disabled={!headers}>
        {headers && <Headers headers={headers} />}
      </Collapsible>

      <Collapsible title={contentTitle} disabled={!content}>
        <Content data={content} />
      </Collapsible>
    </>
  );
}
