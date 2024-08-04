import { formatDateTime } from "../helpers/helpers";

export function DateTime({
  dateTime,
  timeOnly = false,
}: {
  dateTime: string;
  timeOnly: boolean;
}) {
  return (
    dateTime && (
      <div className="ml-auto">{formatDateTime(dateTime, timeOnly)}</div>
    )
  );
}
