"use client";

import React, { useState } from "react";

// import Image from "next/image";
// import { Card } from "@repo/ui/card";
// import { Code } from "@repo/ui/code";
// import styles from "./page.module.css";
// import { Button } from "@repo/ui/button";
import { Header } from "./components/Header";
import { Detail } from "./components/Detail";
import { List } from "./components/List";

import exampleData from "./data/example02.json";

function prepareEntries(data: any): any {
  if (!Array.isArray(data)) {
    return [];
  }

  return data.map((item) => {
    const { startedDateTime, time, request, response } = item;

    const { method, url } = request;
    const { status } = response;

    return {
      status,
      url,
      method,
      startedDateTime,
      time,
    };
  });
}

function prepareDetail(data: any): any {
  if (!data) {
    return null;
  }

  const { request, response, serverIPAddress } = data;
  const { method, url } = request;
  const { status } = response;

  return {
    status,
    url,
    method,
    serverIPAddress,
  };
}

export default function Page(): JSX.Element {
  const [id, setId] = useState(0);

  const entries = exampleData?.log?.entries || [];
  const list = prepareEntries(entries);
  const detail = prepareDetail(entries[id] || {});

  const onSelect = (index: number) => {
    setId(index);
  };

  return (
    <div className="flex flex-col bg-bunker-900 w-screen h-screen font-mono">
      <Header></Header>
      <main className="flex flex-1 flex-col items-stretch overflow-hidden lg:flex-row">
        <List data={list} selected={id} onSelect={onSelect} />
        <Detail data={detail} />
      </main>
    </div>
  );
}
