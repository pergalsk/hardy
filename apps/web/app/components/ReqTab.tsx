import { Collapsible } from "./Collapsible";
import { Headers } from "./Headers";
import { JsonContent } from "./JsonContent";
import { NoData } from "./NoData";

export function ReqTab({ data }: { data: any }): JSX.Element {
  const { headers, content } = data;
  return (
    <>
      <Collapsible title="Headers">
        {headers && <Headers headers={headers} />}
      </Collapsible>

      <Collapsible title="Content">
        <div className="text-mirage-200 break-all text-lg">
          {content ? <JsonContent data={content} /> : <NoData>No data</NoData>}
        </div>
      </Collapsible>
    </>
  );
}
