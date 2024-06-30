"use client";
import React from "react";
import { List } from "./List";
import { Detail } from "./Detail";
import { Panel } from "./Panel";
import { Filter } from "./Filter";

export function FileContent(): JSX.Element {
  return (
    <main className="flex flex-1 flex-col items-stretch overflow-hidden lg:flex-row">
      <Panel>
        <Filter />
        <List />
      </Panel>
      <Panel>
        <Detail />
      </Panel>
    </main>
  );
}
