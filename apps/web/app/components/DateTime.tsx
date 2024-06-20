import { formatDateTime } from "../helpers/helpers";

export function DateTime({ dateTime }: { dateTime: string }) {
  return <div className="ml-auto">{formatDateTime(dateTime)}</div>;
}
