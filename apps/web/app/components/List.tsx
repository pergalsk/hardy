import { useAppStore } from "../store/store";
import {
  selectFilter,
  selectListData,
  selectRowId,
  selectSetRowId,
} from "../store/selectors";
import { filterData } from "../helpers/filter";
import { ListItem } from "./ListItem";

export function List(): JSX.Element {
  const filter = useAppStore(selectFilter);
  const listData = useAppStore(selectListData);
  const rowId = useAppStore(selectRowId);
  const setRowId = useAppStore(selectSetRowId);

  return (
    <div className="flex flex-col gap-2 overflow-y-auto pr-2">
      {listData.filter(filterData(filter)).map((item: any) => {
        return (
          <ListItem
            key={item.$$id}
            id={item.$$id}
            isSelected={item.$$id === rowId}
            status={item.status}
            statusText={item.statusText}
            method={item.method}
            url={item.url}
            dateTime={item.startedDateTime}
            time={item.time}
            onSelect={() => setRowId(item.$$id)}
          />
        );
      })}
    </div>
  );
}
