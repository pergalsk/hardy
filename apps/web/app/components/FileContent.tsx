"use client";
import React from "react";
import { List } from "./List";
import { Detail } from "./Detail";
import { Panel } from "./Panel";
import { ListFilter } from "./ListFilter";
import { ListSorting } from "./ListSorting";

export function FileContent(): JSX.Element {
  return (
    <main className="flex flex-1 flex-col items-stretch overflow-hidden lg:flex-row">
      <Panel>
        <ListFilter />
        <ListSorting />
        <List />
      </Panel>
      <Panel>
        <Detail />
      </Panel>
    </main>
  );
}
