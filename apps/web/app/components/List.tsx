import { useAppStore } from "../store/store";
import { selectFilter, selectListData } from "../store/selectors";
import { filterData } from "../helpers/filter";
import { ListItem } from "./ListItem";

export function List(): JSX.Element {
  const filter = useAppStore(selectFilter);
  const listData = useAppStore(selectListData);

  return (
    <div className="flex flex-col gap-2 overflow-y-auto pr-2">
      {listData.filter(filterData(filter)).map((item: any) => (
        <ListItem key={item.$$id} item={item} />
      ))}
    </div>
  );
}
