"use client";
import React, { useState, useEffect } from "react";
import { readFileData } from "../helpers/helpers";
import { nanoid } from "../helpers/nanoid";
import { useAppStore } from "../store/store";
import { selectAddFile, selectSetRowId } from "../store/selectors";

export const FileDropper = () => {
  const addFile = useAppStore(selectAddFile);
  const setRowId = useAppStore(selectSetRowId);
  const [isDragging, setIsDragging] = useState(false);

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
      setRowId(1); // reset rowId to 1 (first entry in the list)
    } catch (error) {
      console.error("Error loading file:", error);
      // todo: modal with warning
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
      className={`${isDragging ? "border-accent-400 text-accent-400" : "text-mirage-500 border-mirage-700"} group flex h-1/2 w-1/2 select-none items-center justify-center rounded-2xl border-4 border-dashed text-lg font-bold transition-colors duration-200`}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      Drop HAR file here
    </div>
  );
};
