import { Method } from "./Method";
import { Url } from "./Url";
import { Status } from "./Status";
import { DateTime } from "./DateTime";
import { Time } from "./Time";

interface ListItemProps {
  index: number;
  status: number;
  statusText: string;
  method: string;
  url: string;
  dateTime: string;
  time: number;
  isSelected: boolean;
  id: number;
  onSelect: (index: number) => void;
}

export function ListItem(props: ListItemProps): JSX.Element {
  const {
    index,
    status,
    statusText,
    method,
    url,
    dateTime,
    time,
    isSelected,
    id,
    onSelect,
  } = props;

  const selectedClasses = isSelected
    ? "border-accent-700 hover:border-accent-600"
    : "border-transparent hover:border-bunker-200";

  return (
    <div
      className={`${selectedClasses} bg-bunker-800 text-mirage-200 group flex w-full flex-col gap-2 rounded-xl border-2 p-2 text-sm transition-colors duration-200 hover:cursor-pointer hover:border-2`}
      onClick={() => onSelect(id)}
    >
      <div className="flex items-center gap-1">
        <Status status={status} text={statusText} colored={true} />
        <DateTime dateTime={dateTime} timeOnly={true} />
        <div className="text-mirage-600">|</div>
        <Time time={time} />
        <div className="text-mirage-600">|</div>
        <div className="text-mirage-200">#{id}</div>
      </div>
      <div className="flex gap-2">
        <Method method={method} colored={true} />
        <Url url={url} />
      </div>
    </div>
  );
}
