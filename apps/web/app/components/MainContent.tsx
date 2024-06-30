"use client";
import React from "react";
import { useAppStore } from "../store/store";
import { selectEntriesNum } from "../store/selectors";
import { FileContent } from "./FileContent";
import { FileSelect } from "./FileSelect";

export function MainContent(): JSX.Element {
  const isData = !!useAppStore(selectEntriesNum);
  return isData ? <FileContent /> : <FileSelect />;
}
