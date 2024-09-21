"use client";
import React, { LegacyRef } from "react";
import { useDarkMode } from "../helpers/useDarkMode";
import { FileOpener } from "./FileOpener";
import { FileOpenLightSvg } from "./FileOpenLightSvg";
import { FileOpenDarkSvg } from "./FileOpenDarkSvg";
import { useDragging } from "../helpers/useDragging";
import { WrongFile } from "./WrongFile";
import { openFile } from "../helpers/openFile";

function processDraggedFile(e: DragEvent) {
  const file = e.dataTransfer?.files[0];
  if (!file) {
    return;
  }
  openFile(file, <WrongFile name={file.name} />);
}

export const FileDropper = () => {
  const isDark = useDarkMode();
  const [ref, isDragging] = useDragging<HTMLDivElement>(processDraggedFile);

  return (
    <div
      className={`${isDragging ? "border-accent-600 text-accent-600" : "border-mirage-200 dark:border-bunker-100 dark:text-mirage-400 text-mirage-500"} flex h-full w-full select-none flex-row items-center justify-center gap-3 rounded-2xl border-4 border-dashed font-bold portrait:flex-col`}
      ref={ref as LegacyRef<HTMLDivElement>}
    >
      <div className="flex h-1/2 max-h-[800px] w-2/3 max-w-[800px] md:h-2/3 md:w-2/5">
        {isDark ? <FileOpenDarkSvg /> : <FileOpenLightSvg />}
      </div>

      <div className="flex flex-col gap-2">
        <div className="text-center">Drop HAR file here</div>
        <div className="pb-2 text-center text-sm">or</div>
        <FileOpener />
      </div>
    </div>
  );
};
