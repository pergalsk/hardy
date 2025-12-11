import { Collapsible } from "./Collapsible";
import { HeadersTable } from "./HeadersTable";
import { Content } from "./Content";
import { CollapsibleTitle } from "./CollapsibleTitle";
import { findHeader } from "../helpers/helpers";

export function ReqTab({ data }: { data: any }): JSX.Element {
  const { headers, headersSize, content, bodySize } = data;

  const cType: { name: string; value: string } =
    headers?.find(findHeader("Content-Type")) || {};

  const hInfo = headers != null ? ` ${headersSize} b` : "No data";
  const hTitle = <CollapsibleTitle title={"Headers"} info={hInfo} />;

  const cInfo = content != null ? ` ${bodySize} b` : "No data";
  const cTitle = (
    <CollapsibleTitle
      title={"Content"}
      info={[cType.value, cInfo].filter(Boolean).join(" | ")}
    />
  );

  return (
    <>
      <Collapsible title={hTitle} disabled={!headers}>
        {headers && <HeadersTable headers={headers} />}
      </Collapsible>

      <Collapsible title={cTitle} disabled={!content}>
        <Content data={content} />
      </Collapsible>
    </>
  );
}
