import { useAppStore } from "../store/store";
import { selectRowId } from "../store/selectors";
import { setRowId } from "../store/actions";
import { Method } from "./Method";
import { Url } from "./Url";
import { Status } from "./Status";
import { DateTime } from "./DateTime";
import { Time } from "./Time";

export function ListItem({ item }: { item: any }): JSX.Element {
  const rowId = useAppStore(selectRowId);

  const {
    pageref,
    status,
    statusText,
    method,
    url,
    startedDateTime,
    time,
    $$id,
    $$hidden,
  } = item;

  const isError = parseInt(status) <= 599 && parseInt(status) >= 400;

  const selectedClasses =
    $$id === rowId
      ? isError
        ? "border-red-400 hover:border-red-600 dark:border-red-800 dark:hover:border-red-600"
        : "border-accent-500 hover:border-accent-600 dark:border-accent-700 dark:hover:border-accent-400"
      : isError
        ? "border-transparent hover:border-red-200 dark:hover:border-red-950"
        : "border-transparent hover:border-mirage-100 dark:hover:border-bunker-200";

  const bgClasses = isError
    ? "bg-[#ff000013] dark:bg-[#ff00001c]"
    : "dark:bg-bunker-800 bg-slate-100";

  return (
    <div
      className={`${selectedClasses} ${bgClasses} ${$$hidden ? "opacity-20" : ""} text-mirage-800 dark:text-mirage-200 group flex w-full flex-col gap-2 rounded-xl border-2 p-2 transition-colors duration-200 hover:border-2`}
      onClick={() => setRowId($$id)}
    >
      <div className="flex items-center justify-between gap-1">
        <Status status={status} text={statusText} colored={true} />
        <div className="flex items-center gap-1 text-sm">
          <div>{(pageref ?? "").toUpperCase()}</div>
          <div className="text-mirage-600">|</div>
          <Time time={time} />
          <div className="text-mirage-600">|</div>
          <DateTime dateTime={startedDateTime} timeOnly={true} />
          <div className="text-mirage-600">|</div>
          <div className="text-mirage-200 dark:bg-accent-600 rounded px-1 dark:text-black">
            #{$$id + 1}
          </div>
        </div>
      </div>
      <div className="flex gap-2">
        <Method method={method} colored={true} />
        <Url url={url} />
      </div>
    </div>
  );
}
