"use client";
import React from "react";
import { readFileData } from "../helpers/helpers";

interface FileOpenerProps {
  onFileOpen: (file: any) => void;
}

export const FileOpener = ({ onFileOpen }: FileOpenerProps) => {
  const openFileSelector = () => {
    (document.querySelector("input[type='file']") as HTMLInputElement)?.click();
  };

  const handleFileInputChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    const { name, size } = file;

    try {
      const fileData = await readFileData(file);
      const data = JSON.parse(fileData);
      console.log("Loaded file data:", data);
      onFileOpen({ name, size, data });
    } catch (error) {
      console.error("Error loading file:", error);
    }
  };

  return (
    <>
      <input
        type="file"
        accept=".har"
        onChange={handleFileInputChange}
        className="hidden"
      />

      <button
        className="bg-bunker-400 hover:bg-accent-950 rounded-lg px-8 py-4 text-lg font-bold text-white transition-colors duration-200"
        onClick={openFileSelector}
      >
        Open HAR file
      </button>
    </>
  );
};
