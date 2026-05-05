import { groupByProperty } from "../helpers/groupByProperty";
import { selectSettings } from "../../settings/selectors";
import { useAppStore } from "../../../store/store";
import { selectPinnedIds, selectRowId } from "../selectors";
import { HiddenItemsGroup } from "./HiddenItemsGroup";
import { ListItem } from "./ListItem";
import type { ListItem as ListItemType } from "../types";

export function ListItems({ items }: { items: ListItemType[] }) {
  const { groupHidden, excludeHidden } = useAppStore(selectSettings);
  const rowId = useAppStore(selectRowId);
  const pinnedIds = useAppStore(selectPinnedIds);

  return groupByProperty(items, "$$hidden").map((group) => {
    const [firstItem] = group;
    if (!firstItem) return null;
    if (groupHidden && !excludeHidden && firstItem.$$hidden) {
      return <HiddenItemsGroup key={"hidden-" + firstItem.$$id} group={group} />;
    }

    return group.map((item) => {
      if (excludeHidden && item.$$hidden) {
        return null;
      }
      return (
        <ListItem
          item={item}
          key={item.$$id}
          isSelected={rowId === item.$$id}
          isPinned={pinnedIds.has(item.$$id)}
        />
      );
    });
  });
}
