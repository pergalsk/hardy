"use client";
import type React from "react";
import { useListView } from "../hooks/useListView";
import { PanelList } from "./PanelList";
import { ListItems } from "./ListItems";
import { PageRefGroup } from "./PageRefGroup";

export function List(): React.JSX.Element {
  const { items, groups } = useListView();

  if (!groups) {
    return (
      <PanelList rightGap>
        <ListItems items={items} />
      </PanelList>
    );
  }

  return (
    <PanelList rightGap>
      {groups.map((group) => (
        <PageRefGroup key={group[0]!.$$id} items={group} />
      ))}
    </PanelList>
  );
}
