import { useAppStore } from "../store/store";
import { selectFilter, selectListData } from "../store/selectors";
import { filterData } from "../helpers/filter";
import { HiddenCount } from "./HiddenCount";
import { ListItem } from "./ListItem";

export function List(): JSX.Element {
  const filter = useAppStore(selectFilter);
  const listData = useAppStore(selectListData);
  const filteredList = listData.reduce(filterData(filter), []);

  return (
    <div className="flex flex-col gap-2 overflow-y-auto pr-2">
      {filteredList.map((item: any) => {
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
