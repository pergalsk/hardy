"use client";
import React, { useState, useEffect } from "react";
import { readFileData } from "../helpers/helpers";
import { nanoid } from "../helpers/nanoid";
import { useAppStore, type AppStore } from "../store/store";

export const FileDropper = () => {
  const addFile = useAppStore((state: AppStore) => state.addFile);
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
      className={`${isDragging ? "border-accent-800 text-accent-600" : "text-mirage-500 border-mirage-700"} group flex h-1/2 w-1/2 select-none items-center justify-center rounded-2xl border-4 border-dashed text-lg transition-colors duration-200`}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      Drop HAR file here
    </div>
  );
};
