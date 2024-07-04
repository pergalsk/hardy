import { Collapsible } from "./Collapsible";
import { JsonContent } from "./JsonContent";
import { Headers } from "./Headers";
import { NoData } from "./NoData";

export function ResTab({ data }: { data: any }): JSX.Element {
  return (
    <>
      <Collapsible title="Headers">
        {data?.headers && <Headers headers={data?.headers} />}
      </Collapsible>

      <Collapsible title="Content">
        <div className="text-mirage-200 break-all text-lg">
          {data?.content ? (
            <JsonContent data={data.content} />
          ) : (
            <NoData>No data</NoData>
          )}
        </div>
      </Collapsible>
    </>
  );
}
