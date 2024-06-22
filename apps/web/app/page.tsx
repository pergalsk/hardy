"use client";

// import Image from "next/image";
// import { Card } from "@repo/ui/card";
// import { Code } from "@repo/ui/code";
// import styles from "./page.module.css";
// import { Button } from "@repo/ui/button";

import React, { useState } from "react";
import {
  prepareCommon,
  prepareList,
  prepareParts,
  prepareFooter,
} from "./helpers/helpers";
import { Header } from "./components/Header";
import { Detail } from "./components/Detail";
import { List } from "./components/List";
import { Footer } from "./components/Footer";
import { FileDropper } from "./components/FileDropper";
import { FileOpener } from "./components/FileOpener";

export default function Page(): JSX.Element {
  const [id, setId] = useState(0);
  const [tab, setTab] = useState("REQ");
  const [data, setData] = useState(null);

  const log = (data as { log: any } | null)?.log;
  const entries = log?.entries || [];

  const list = prepareList(entries);
  const common = prepareCommon(entries[id]);
  const parts = prepareParts(entries[id]);
  const footer = prepareFooter(log);

  const onSelect = (index: number) => {
    setId(index);
    console.log(index);
  };

  const onTabChange = (tab: string) => {
    setTab(tab);
    console.log(tab);
  };

  const onFileOpen = (jsonData: any) => {
    setData(jsonData);
  };

  return (
    <div className="bg-bunker-900 flex h-screen w-screen flex-col font-mono">
      <Header></Header>
      {data ? (
        <main className="flex flex-1 flex-col items-stretch overflow-hidden lg:flex-row">
          <List data={list} selected={id} onSelect={onSelect} />
          <Detail
            data={common}
            parts={parts}
            tab={tab}
            onTabChange={onTabChange}
          />
        </main>
      ) : (
        <main className="flex flex-1 flex-col items-center justify-center gap-4 overflow-hidden">
          <FileDropper onFileOpen={onFileOpen} />
          <FileOpener onFileOpen={onFileOpen} />
        </main>
      )}
      <Footer data={footer} />
    </div>
  );
}
