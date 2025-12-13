import { useAppStore } from "../store/store";
import { selectFilter, selectListData } from "../store/selectors";
import { filterData } from "../helpers/filter";
import { HiddenCount } from "./HiddenCount";
import { ListItem } from "./ListItem";
import { setFilteredCount } from "../store/actions";
import { useEffect } from "react";

export function List(): JSX.Element {
  const filter = useAppStore(selectFilter);
  const listData = useAppStore(selectListData);
  const items = listData.reduce(filterData(filter), []);

  const filtered = items.filter((item: any) => !item.$$stats);

  useEffect(() => {
    setFilteredCount(filtered.length);
  }, [filtered.length]);

  return (
    <div className="flex flex-col gap-2 overflow-y-auto pr-2">
      {items.map((item: any) => {
        const { $$id, $$stats } = item;
        return $$stats ? (
          <HiddenCount key={$$id} count={item.$$hidden} />
        ) : (
          <ListItem key={$$id} item={item} />
        );
      })}
    </div>
  );
}
