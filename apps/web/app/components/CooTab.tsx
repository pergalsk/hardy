import { Collapsible } from "./Collapsible";
import { CollapsibleTitle } from "./CollapsibleTitle";
import { Cookies } from "./Cookies";
import { NoContent } from "./NoContent";

export function CooTab({ data }: { data: any }): JSX.Element {
  const { cookies } = data;
  const { request, response } = cookies;

  const reqLength = request.length > 0;
  const reqInfo = request.length > 0 ? "" : "No data";
  const reqTitle = (
    <CollapsibleTitle title={"Request Cookies"} info={reqInfo} />
  );

  const resLength = response.length > 0;
  const resInfo = response.length > 0 ? "" : "No data";
  const resTitle = (
    <CollapsibleTitle title={"Response Cookies"} info={resInfo} />
  );

  return (
    <>
      <Collapsible title={reqTitle} disabled={!reqLength}>
        {reqLength ? <Cookies data={request} /> : <NoContent />}
      </Collapsible>

      <Collapsible title={resTitle} disabled={!resLength}>
        {resLength ? <Cookies data={response} /> : <NoContent />}
      </Collapsible>
    </>
  );
}
