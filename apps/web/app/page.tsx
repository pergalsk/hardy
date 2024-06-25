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
  selectFilter,
  selectSetFilter,
} from "./store/store";
import { Header } from "./components/Header";
import { List } from "./components/List";
import { Detail } from "./components/Detail";
import { FileDropper } from "./components/FileDropper";
import { FileOpener } from "./components/FileOpener";
import { Footer } from "./components/Footer";
import { Panel } from "./components/Panel";
import { prepareCommon, prepareList, prepareParts } from "./helpers/helpers";

export default function Page(): JSX.Element {
  const files = useAppStore(selectFiles);
  const rowId = useAppStore(selectRowId);
  const setRowId = useAppStore(selectSetRowId);

  const data = files?.[0]?.data || null;
  const log = (data as { log: any } | null)?.log;
  const entries: any = (log?.entries || []).map(
    (entry: any, index: number) => ({
      ...entry,
      $$id: index + 1,
    }),
  );

  const entry = entries.find((entry: any) => entry.$$id === rowId);

  const list = prepareList(entries);
  const common = prepareCommon(entry);
  const parts = prepareParts(entry);

  const onSelect = (rowId: number) => {
    setRowId(rowId);
    console.log(rowId);
  };

  return (
    <div className="bg-bunker-900 flex h-screen w-screen flex-col font-mono">
      <Header />
      {data ? (
        <main className="flex flex-1 flex-col items-stretch overflow-hidden lg:flex-row">
          <Panel>
            <Filter />
            <List data={list} selected={rowId} onSelect={onSelect} />
          </Panel>
          <Panel>
            <Detail data={common} parts={parts} />
          </Panel>
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

export function Filter() {
  const filter = useAppStore(selectFilter);
  const setFilter = useAppStore(selectSetFilter);

  const { url, status, method } = filter;

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setFilter({ ...filter, url });
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const status = e.target.value;
    setFilter({ ...filter, status });
  };

  const handleMethodChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const method = e.target.value;
    setFilter({ ...filter, method });
  };

  return (
    <div className="bg-bunker-500 text-mirage-200 flex flex-col flex-wrap gap-2 rounded-md px-2 py-2">
      <div className="flex flex-row items-center gap-4 p-0">
        <span className="font-bold">URL</span>
        <input
          type="text"
          className="bg-bunker-700 flex-1 rounded-md px-2 py-1 text-sm text-white"
          value={url}
          onChange={handleUrlChange}
        />
      </div>

      <div className="flex flex-row items-center gap-4 p-0">
        <span className="font-bold">Status</span>
        <input
          type="text"
          className="bg-bunker-700 flex-1 rounded-md px-2 py-1 text-sm text-white"
          value={status}
          onChange={handleStatusChange}
        />

        <span className="font-bold">Method</span>
        <input
          type="text"
          className="bg-bunker-700 flex-1 rounded-md px-2 py-1 text-sm text-white"
          value={method}
          onChange={handleMethodChange}
        />
      </div>
    </div>
  );
}
