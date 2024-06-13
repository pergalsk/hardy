import { Method } from "./Method";
import { Url } from "./Url";
import { Status } from "./Status";

interface ListItemProps {
  status: number;
  method: string;
  url: string;
}

export function ListItem({ status, method, url }: ListItemProps): JSX.Element {
  return (
    <div className="flex flex-row w-full p-4 border-b border-thin border-bunker-700 gap-2 items-center hover:bg-bunker-800 hover:cursor-pointer transition-colors duration-200">
      <Status status={status} colored={false} />
      <Method method={method} colored={false} />
      <Url url={url} />
    </div>
  );
}
