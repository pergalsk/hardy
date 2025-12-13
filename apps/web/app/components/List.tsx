import { useEffect } from "react";
import { useAppStore } from "../store/store";
import { selectFilter, selectListData } from "../store/selectors";
import { setFilteredCount } from "../store/actions";
import { filterData } from "../helpers/filter";
import { HiddenCount } from "./HiddenCount";
import { ListItem } from "./ListItem";
import { PageRef } from "./PageRef";

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
      {items.map((item: any, index: number, all: any[]) => {
        const { pageref: prev_pageRef } = index > 0 ? all[index - 1] : {};
        const { $$id, $$stats, pageref } = item;

        return (
          <div key={$$id} className="w-full">
            {pageref !== prev_pageRef && <PageRef pageref={pageref} />}

            {$$stats ? (
              <HiddenCount count={item.$$hidden} />
            ) : (
              <ListItem item={item} />
            )}
          </div>
        );
      })}
    </div>
  );
}
