import { useAppStore } from "../../../store/store";
import { selectPinnedIds, selectRowId } from "../selectors";
import { Collapsible } from "../../../components/Collapsible";
import { HiddenCount } from "./HiddenCount";
import { ListItem } from "./ListItem";
import { PanelList } from "./PanelList";
import type { ListItem as ListItemType } from "../types";

export function HiddenItemsGroup({ group }: { group: ListItemType[] }) {
  const rowId = useAppStore(selectRowId);
  const pinnedIds = useAppStore(selectPinnedIds);

  return (
    <Collapsible
      handler={<HiddenCount count={group.length} />}
      transparent={true}
      initOpen={false}
      sticky={false}
    >
      <PanelList>
        {group.map((item) => (
          <ListItem
            item={item}
            key={item.$$id}
            isSelected={rowId === item.$$id}
            isPinned={pinnedIds.has(item.$$id)}
          />
        ))}
      </PanelList>
    </Collapsible>
  );
}
