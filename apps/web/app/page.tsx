"use client";

// import Image from "next/image";
// import { Card } from "@repo/ui/card";
// import { Code } from "@repo/ui/code";
// import styles from "./page.module.css";
// import { Button } from "@repo/ui/button";

import React, { useState } from "react";
import { useAppStore, type AppStore } from "./store/store";

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
  const rowId = useAppStore((state: AppStore) => state.ui.rowId);
  const setRowId = useAppStore((state: AppStore) => state.setRowId);
  const [tab, setTab] = useState<string>("REQ");
  const [files, setFiles] = useState<any[]>([]);

  const data = files?.[0]?.data || null;

  const log = (data as { log: any } | null)?.log;
  const entries = log?.entries || [];

  const list = prepareList(entries);
  const common = prepareCommon(entries[rowId]);
  const parts = prepareParts(entries[rowId]);
  const footer = prepareFooter(log);

  const onSelect = (index: number) => {
    setRowId(index);
    console.log(index);
  };

  const onTabChange = (tab: string) => {
    setTab(tab);
    console.log(tab);
  };

  const onFileOpen = (file: any) => {
    const newFiles = [...files, file];
    setFiles(newFiles);
  };

  const onFileClose = (index: number) => () => {
    const newFiles = files.filter((_, i) => i !== index);
    setRowId(0);
    setTab("REQ");
    setFiles(newFiles);
  };

  return (
    <div className="bg-bunker-900 flex h-screen w-screen flex-col font-mono">
      <Header
        files={files.map((file) => ({ name: file.name, size: file.size }))}
        onClose={onFileClose}
      />
      {data ? (
        <main className="flex flex-1 flex-col items-stretch overflow-hidden lg:flex-row">
          <List data={list} selected={rowId} onSelect={onSelect} />
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
