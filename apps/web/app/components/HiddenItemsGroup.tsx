import { Collapsible } from "./Collapsible";
import { HiddenCount } from "./HiddenCount";
import { ListItem } from "./ListItem";
import { PanelList } from "./PanelList";

export function HiddenItemsGroup({ group }: { group: any[] }) {
  return (
    <Collapsible
      handler={<HiddenCount count={group.length} />}
      transparent={true}
      initOpen={false}
      sticky={false}
    >
      <PanelList>
        {group.map((item, index) => (
          <ListItem item={item} key={index} />
        ))}
      </PanelList>
    </Collapsible>
  );
}
