import { parseJsonData } from "../helpers/helpers";
import { JsonContent } from "./JsonContent";
import { NoContent } from "./NoContent";

function TextContent({ data }: { data: string }): JSX.Element {
  return <span className="break-all text-sm text-black">{data}</span>;
}

export function Content({ data }: { data: any }): JSX.Element {
  if (!data) {
    return <NoContent>No Content</NoContent>;
  }

  const jsonObj = parseJsonData(data);

  if (!jsonObj) {
    return <TextContent data={data} />;
  }

  return <JsonContent data={jsonObj} />;
}
