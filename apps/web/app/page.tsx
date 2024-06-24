"use client";

// import Image from "next/image";
// import { Card } from "@repo/ui/card";
// import { Code } from "@repo/ui/code";
// import styles from "./page.module.css";
// import { Button } from "@repo/ui/button";

import React from "react";
import {
  useAppStore,
  selectFiles,
  selectRowId,
  selectSetRowId,
} from "./store/store";
import { Header } from "./components/Header";
import { List } from "./components/List";
import { Detail } from "./components/Detail";
import { FileDropper } from "./components/FileDropper";
import { FileOpener } from "./components/FileOpener";
import { Footer } from "./components/Footer";
import { prepareCommon, prepareList, prepareParts } from "./helpers/helpers";

export default function Page(): JSX.Element {
  const files = useAppStore(selectFiles);
  const rowId = useAppStore(selectRowId);
  const setRowId = useAppStore(selectSetRowId);

  const data = files?.[0]?.data || null;
  const log = (data as { log: any } | null)?.log;
  const entries = log?.entries || [];

  const list = prepareList(entries);
  const common = prepareCommon(entries[rowId]);
  const parts = prepareParts(entries[rowId]);

  const onSelect = (index: number) => {
    setRowId(index);
    console.log(index);
  };

  return (
    <div className="bg-bunker-900 flex h-screen w-screen flex-col font-mono">
      <Header />
      {data ? (
        <main className="flex flex-1 flex-col items-stretch overflow-hidden lg:flex-row">
          <List data={list} selected={rowId} onSelect={onSelect} />
          <Detail data={common} parts={parts} />
        </main>
      ) : (
        <main className="flex flex-1 flex-col items-center justify-center gap-4 overflow-hidden">
          <FileDropper />
          <FileOpener />
        </main>
      )}
      <Footer />
    </div>
  );
}
