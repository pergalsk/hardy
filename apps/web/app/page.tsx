"use client";

// import Image from "next/image";
// import { Card } from "@repo/ui/card";
// import { Code } from "@repo/ui/code";
// import styles from "./page.module.css";
// import { Button } from "@repo/ui/button";

import React from "react";
import { useAppStore } from "./store/store";
import { selectFiles, selectRowId } from "./store/selectors";
import { Header } from "./components/Header";
import { List } from "./components/List";
import { Detail } from "./components/Detail";
import { FileDropper } from "./components/FileDropper";
import { FileOpener } from "./components/FileOpener";
import { Footer } from "./components/Footer";
import { Panel } from "./components/Panel";
import { Filter } from "./components/Filter";
import { prepareCommon, prepareParts } from "./helpers/helpers";

export default function Page(): JSX.Element {
  const files = useAppStore(selectFiles);
  const rowId = useAppStore(selectRowId);

  const data = files?.[0]?.data || null;
  const log = (data as { log: any } | null)?.log;
  const entries: any = (log?.entries || []).map(
    (entry: any, index: number) => ({
      ...entry,
      $$id: index + 1,
    }),
  );

  const entry = entries.find((entry: any) => entry.$$id === rowId);
  const common = prepareCommon(entry);
  const parts = prepareParts(entry);

  return (
    <div className="bg-bunker-900 flex h-screen w-screen flex-col font-mono">
      <Header />
      {data ? (
        <main className="flex flex-1 flex-col items-stretch overflow-hidden lg:flex-row">
          <Panel>
            <Filter />
            <List />
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
