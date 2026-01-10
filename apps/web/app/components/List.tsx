import { useEffect } from "react";
import { useAppStore } from "../store/store";
import {
  selectFilter,
  selectListData,
  selectSettings,
} from "../store/selectors";
import { setFilteredCount } from "../store/actions";
import { markVisible } from "../helpers/filter";
import { groupByProperty } from "../helpers/groupByProperty";
import { PanelList } from "./PanelList";
import { ListItems } from "./ListItems";
import { PageRefGroup } from "./PageRefGroup";

export function List(): JSX.Element {
  const filter = useAppStore(selectFilter);
  const listData = useAppStore(selectListData);
  const { showPages, hideEmptyPages } = useAppStore(selectSettings);

  const listItems = listData.map(markVisible(filter));
  const filtered = listItems.filter((item: any) => !item.$$hidden);

  useEffect(() => {
    setFilteredCount(filtered.length);
  }, [filtered.length]);

  if (!showPages) {
    return (
      <PanelList rightGap>
        <ListItems items={listItems} />
      </PanelList>
    );
  }

  return (
    <PanelList rightGap>
      {groupByProperty(listItems, "pageref").map((group, groupIndex) => {
        return hideEmptyPages &&
          !group.some((item) => !item.$$hidden) ? null : (
          <PageRefGroup key={groupIndex} items={group} />
        );
      })}
    </PanelList>
  );
}
