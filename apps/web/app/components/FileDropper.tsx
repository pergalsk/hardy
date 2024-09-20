"use client";
import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  LegacyRef,
} from "react";
import { useDarkMode } from "../helpers/useDarkMode";
import { readFileData } from "../helpers/helpers";
import { nanoid } from "../helpers/nanoid";
import { addFile, addToast, setRowId } from "../store/actions";
import { FileOpener } from "./FileOpener";
import { FileOpenLightSvg } from "./FileOpenLightSvg";
import { FileOpenDarkSvg } from "./FileOpenDarkSvg";

export function useDragging<T extends HTMLElement>(
  callbackFn: (e: DragEvent) => void,
) {
  const ref = useRef<T>(null);
  const [isDragging, setIsDragging] = useState(false);

  const onDragEnter = useCallback((e: DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const onDragleave = useCallback((e: DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const onDragover = useCallback((e: DragEvent) => {
    e.preventDefault();
  }, []);

  const onDrop = useCallback((e: DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    callbackFn(e);
  }, []);

  useEffect(() => {
    if (ref.current != null) {
      ref.current.addEventListener("dragenter", onDragEnter);
      ref.current.addEventListener("dragleave", onDragleave);
      ref.current.addEventListener("dragover", onDragover);
      ref.current.addEventListener("drop", onDrop);
    }

    return () => {
      if (ref.current != null) {
        ref.current.removeEventListener("dragenter", onDragEnter);
        ref.current.removeEventListener("dragleave", onDragleave);
        ref.current.removeEventListener("dragover", onDragover);
        ref.current.removeEventListener("drop", onDrop);
      }
    };
  }, [ref.current]);

  return [ref, isDragging];
}

async function openFile(file: File) {
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
          File{" "}
          <span className="underline-offset-3 italic underline">{name}</span>{" "}
          cannot be opened. Wrong or disrupted content.
        </>
      ),
    });
  }
}

function processDraggedFile(e: DragEvent) {
  const file = e.dataTransfer?.files[0];
  if (!file) {
    return;
  }
  openFile(file);
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
