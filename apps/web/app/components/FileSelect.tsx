"use client";
import React from "react";
import { FileDropper } from "./FileDropper";

export function FileSelect(): JSX.Element {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-4 overflow-hidden p-16">
      <FileDropper />
    </main>
  );
}
