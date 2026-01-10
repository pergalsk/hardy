import { Collapsible } from "./Collapsible";
import { ListItems } from "./ListItems";
import { PageRef } from "./PageRef";
import { PanelList } from "./PanelList";

export function PageRefGroup({ items }: { items: any[] }) {
  const title = <PageRef pageref={items[0].pageref} />;

  return (
    <Collapsible title={title} disabled={items.length === 0}>
      <PanelList>
        <ListItems items={items} />
      </PanelList>
    </Collapsible>
  );
}
