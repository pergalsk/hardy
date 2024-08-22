import { Collapsible } from "./Collapsible";
import { Headers } from "./Headers";
import { Content } from "./Content";

export function ResTab({ data }: { data: any }): JSX.Element {
  const { headers, content } = data;

  const headersTitle = `Headers${headers ? "" : " | No content"}`;
  const contentTitle = `Content${content ? "" : " | No content"}`;

  return (
    <>
      <Collapsible title={headersTitle} disabled={!headers}>
        <Headers headers={headers} />
      </Collapsible>

      <Collapsible title={contentTitle} disabled={!content}>
        <Content data={content} />
      </Collapsible>
    </>
  );
}
