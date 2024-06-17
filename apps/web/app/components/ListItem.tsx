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
    onSelect,
  } = props;

  const selectedClasses = isSelected
    ? "border-accent-800 hover:border-accent-600"
    : "hover:border-accent-950";

  return (
    <div
      className={`${selectedClasses} group flex flex-col w-full p-2 bg-bunker-800 gap-2 border-2 border-transparent hover:bg-bunker-800 hover:cursor-pointer transition-colors duration-200 rounded-md hover:border-2  text-sm text-mirage-200`}
      onClick={() => onSelect(index)}
    >
      <div className="flex items-center gap-1">
        <Status status={status} text={statusText} colored={true} />
        <DateTime dateTime={dateTime} />
        <div className="text-mirage-600">|</div>
        <Time time={time} />
      </div>
      <div className="flex gap-2">
        <Method method={method} colored={true} />
        <Url url={url} />
      </div>
    </div>
  );
}
