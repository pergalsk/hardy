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
  } = item;

  const selectedClasses =
    $$id === rowId
      ? "border-accent-500 hover:border-accent-300 dark:border-accent-700 dark:hover:border-accent-400"
      : "border-transparent hover:border-mirage-100 dark:hover:border-bunker-200";

  return (
    <div
      className={`${selectedClasses} text-mirage-800 dark:bg-bunker-800 dark:text-mirage-200 group flex w-full flex-col gap-2 rounded-xl border-2 bg-slate-100 p-2 transition-colors duration-200 hover:border-2`}
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
          <div className="text-mirage-200 dark:text-mirage-500">
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
