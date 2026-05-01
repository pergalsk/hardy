import { groupByProperty } from "../helpers/groupByProperty";
import { selectSettings } from "../../settings/selectors";
import { useAppStore } from "../../../store/store";
import { HiddenItemsGroup } from "./HiddenItemsGroup";
import { ListItem } from "./ListItem";

export function ListItems({ items }: { items: any[] }) {
  const { groupHidden, excludeHidden } = useAppStore(selectSettings);

  return groupByProperty(items, "$$hidden").map((group) => {
    if (groupHidden && !excludeHidden && group[0].$$hidden) {
      return <HiddenItemsGroup key={"hidden-" + group[0].$$id} group={group} />;
    }

    return group.map((item) => {
      if (excludeHidden && item.$$hidden) {
        return null;
      }
      return <ListItem item={item} key={item.$$id} />;
    });
  });
}
