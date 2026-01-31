import { useAppStore } from "../store/store";
import { selectRowId } from "../store/selectors";
import { setRowId } from "../store/actions";
import { Method } from "./Method";
import { Url } from "./Url";
import { Status } from "./Status";
import { DateTime } from "./DateTime";
import { Time } from "./Time";
import ListItemWrapper from "./ListItemWrapper";

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
    $$pinned,
  } = item;

  const isError = parseInt(status) <= 599 && parseInt(status) >= 400;

  const highlightNum = false;
  const numClasses = highlightNum
    ? "text-mirage-200 dark:bg-accent-600 rounded px-1 dark:text-black"
    : "";

  const Separator = () => <div className="text-mirage-600">|</div>;

  return (
    <ListItemWrapper
      selected={$$id === rowId}
      pinned={$$pinned}
      error={isError}
      hidden={!!$$hidden}
      onClick={() => setRowId($$id)}
    >
      <div className="flex items-center justify-between gap-1">
        <Status status={status} text={statusText} colored={true} />

        <div className="flex items-center gap-1 text-sm">
          <div>{(pageref ?? "").toUpperCase()}</div>
          <Separator />
          <Time time={time} />
          <Separator />
          <DateTime dateTime={startedDateTime} timeOnly={true} />
          <Separator />
          <div className={`${numClasses}`}>#{$$id + 1}</div>
          <Separator />
          {$$pinned ? (
            <div className="iconify material-symbols--bookmark-check-rounded text-lg text-yellow-400"></div>
          ) : (
            <div className="iconify material-symbols--bookmark-outline-rounded text-mirage-200 hover:text-accent-200 text-lg"></div>
          )}
        </div>
      </div>

      <div className="flex gap-2">
        <Method method={method} colored={true} />
        <Url url={url} />
      </div>
    </ListItemWrapper>
  );
}
