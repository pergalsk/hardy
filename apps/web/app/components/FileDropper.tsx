"use client";
import React, { useState, useEffect } from "react";
import { useDarkMode } from "../helpers/useDarkMode";
import { readFileData } from "../helpers/helpers";
import { nanoid } from "../helpers/nanoid";
import { addFile, addToast, setRowId } from "../store/actions";
import { FileOpener } from "./FileOpener";
import { FileOpenLightSvg } from "./FileOpenLightSvg";
import { FileOpenDarkSvg } from "./FileOpenDarkSvg";

export const FileDropper = () => {
  const [isDragging, setIsDragging] = useState(false);
  const isDark = useDarkMode();

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];

    if (!file) {
      return;
    }

    const { name, size } = file;
    const fileId = nanoid();

    try {
      const rawData = await readFileData(file);
      const data = JSON.parse(rawData);
      addFile({ fileId, name, size, data });
      setRowId(0);
    } catch (error) {
      console.error("Error loading file:", error);
      addToast({
        type: "alert",
        message: (
          <>
            Súbor{" "}
            <span className="underline-offset-3 italic underline">{name}</span>{" "}
            sa nepodarilo otvoriť. Nesprávny formát.
          </>
        ),
      });
    }
  };

  useEffect(() => {
    const handleDragOverPreventDefault = (e: DragEvent) => {
      e.preventDefault();
    };

    window.addEventListener("dragover", handleDragOverPreventDefault);
    window.addEventListener("drop", handleDragOverPreventDefault);

    return () => {
      window.removeEventListener("dragover", handleDragOverPreventDefault);
      window.removeEventListener("drop", handleDragOverPreventDefault);
    };
  }, []);

  return (
    <div
      className={`${isDragging ? "border-accent-600 text-accent-600" : "border-mirage-200 dark:border-bunker-100 dark:text-mirage-400 text-mirage-500"} flex h-full w-full select-none flex-row items-center justify-center gap-3 rounded-2xl border-4 border-dashed font-bold transition-colors duration-200`}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className="flex h-2/3 w-2/5">
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
