import React from "react";
import { setRowId, togglePinnedRow } from "../actions";
import { Method } from "@repo/ui/method";
import { Url } from "@repo/ui/url";
import { Status } from "@repo/ui/status";
import { DateTime } from "@repo/ui/date-time";
import { formatDateTime } from "../../../core/helpers/formatDateTime";
import { getUrlParts } from "../../../core/helpers/getUrlParts";
import { Time } from "../../detail/components/Time";
import ListItemWrapper from "./ListItemWrapper";

const Separator = () => <div className="text-mirage-600">|</div>;

function ListItemComponent({
  item,
  isSelected,
  isPinned,
}: {
  item: any;
  isSelected: boolean;
  isPinned: boolean;
}): React.JSX.Element {
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

  const highlightNum = false;
  const numClasses = highlightNum
    ? "text-mirage-200 dark:bg-accent-600 rounded px-1 dark:text-black"
    : "";

  const pinnedClasses = isPinned
    ? "iconify material-symbols--bookmark-check-rounded text-lg text-yellow-600"
    : "iconify material-symbols--bookmark-outline-rounded hover:text-accent-700 dark:text-mirage-200 dark:hover:text-accent-200 text-lg";

  return (
    <ListItemWrapper
      selected={isSelected}
      pinned={isPinned}
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
          <DateTime value={formatDateTime(startedDateTime, true)} />
          <Separator />
          <div className={`${numClasses}`}>#{$$id + 1}</div>
          <Separator />
          <div
            className={`${pinnedClasses}`}
            onClick={() => togglePinnedRow($$id)}
          ></div>
        </div>
      </div>

      <div className="flex gap-2">
        <Method method={method} colored={true} />
        <Url {...getUrlParts(url)} />
      </div>
    </ListItemWrapper>
  );
}

export const ListItem = React.memo(ListItemComponent);
