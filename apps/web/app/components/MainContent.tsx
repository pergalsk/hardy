"use client";
import React from "react";
import { useAppStore } from "../store/store";
import { selectEntriesNum } from "../core/selectors";
import { FileContent } from "../features/file/components/FileContent";
import { FileSelect } from "../features/file/components/FileSelect";

export function MainContent(): React.JSX.Element {
  const isData = !!useAppStore(selectEntriesNum);
  return isData ? <FileContent /> : <FileSelect />;
}
