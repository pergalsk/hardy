"use client";
import React, { useState, useEffect } from "react";
import { readFileData } from "../helpers/helpers";

interface FileDropperProps {
  onFileOpen: (file: any) => void;
}

export const FileDropper = ({ onFileOpen }: FileDropperProps) => {
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

    try {
      const fileData = await readFileData(file);
      const jsonData = JSON.parse(fileData);
      console.log("Loaded file data:", jsonData);
      onFileOpen(jsonData);
    } catch (error) {
      console.error("Error loading file:", error);
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
