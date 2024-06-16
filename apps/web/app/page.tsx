"use client";

import React, { useState } from "react";

// import Image from "next/image";
// import { Card } from "@repo/ui/card";
// import { Code } from "@repo/ui/code";
// import styles from "./page.module.css";
// import { Button } from "@repo/ui/button";

import { prepareCommon, prepareList, prepareParts } from "./helpers/helpers";

import { Header } from "./components/Header";
import { Detail } from "./components/Detail";
import { List } from "./components/List";

import exampleData from "./data/example05.json";

export default function Page(): JSX.Element {
  const [id, setId] = useState(0);
  const [tab, setTab] = useState("REQ");

  const entries =
    (exampleData as { log: { entries: any[] } })?.log?.entries || [];

  const list = prepareList(entries);
  const common = prepareCommon(entries[id]);
  const parts = prepareParts(entries[id]);

  const onSelect = (index: number) => {
    setId(index);
    console.log(index);
  };

  const onTabChange = (tab: string) => {
    setTab(tab);
    console.log(tab);
  };

  return (
    <div className="flex flex-col bg-bunker-900 w-screen h-screen font-mono">
      <Header></Header>
      <main className="flex flex-1 flex-col items-stretch overflow-hidden lg:flex-row">
        <List data={list} selected={id} onSelect={onSelect} />
        <Detail
          data={common}
          parts={parts}
          tab={tab}
          onTabChange={onTabChange}
        />
      </main>
    </div>
  );
}
