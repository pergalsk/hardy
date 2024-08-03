import { Collapsible } from "./Collapsible";
import { Cookies } from "./Cookies";
import { NoContent } from "./NoContent";

export function CooTab({ data }: { data: any }): JSX.Element {
  const { cookies } = data;
  const { request, response } = cookies;

  const requestLength = request.length > 0;
  const responseLength = response.length > 0;

  const requestTitle = `Request Cookies${requestLength ? "" : " / No data"}`;
  const responseTitle = `Response Cookies${responseLength ? "" : " / No data"}`;

  return (
    <>
      <Collapsible title={requestTitle} disabled={!requestLength}>
        {requestLength ? <Cookies data={request} /> : <NoContent />}
      </Collapsible>

      <Collapsible title={responseTitle} disabled={!responseLength}>
        {responseLength ? <Cookies data={response} /> : <NoContent />}
      </Collapsible>
    </>
  );
}
