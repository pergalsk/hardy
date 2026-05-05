import { Collapsible } from "../../../components/Collapsible";
import { ListItems } from "./ListItems";
import { PageRef } from "./PageRef";
import { PanelList } from "./PanelList";
import type { ListItem } from "../types";

export function PageRefGroup({ items }: { items: ListItem[] }) {
  const title = <PageRef pageref={items[0]?.pageref} />;

  return (
    <Collapsible title={title} disabled={items.length === 0}>
      <PanelList>
        <ListItems items={items} />
      </PanelList>
    </Collapsible>
  );
}
