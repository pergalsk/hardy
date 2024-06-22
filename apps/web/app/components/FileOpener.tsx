"use client";
import React from "react";

interface FileOpenerProps {
  onFileOpen: (file: any) => void;
}

export const FileOpener = ({ onFileOpen }: FileOpenerProps) => {
  const openFileSelector = () => {
    (document.querySelector("input[type='file']") as HTMLInputElement)?.click();
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    // Handle the selected file here
    console.log("Selected file:", file);

    onFileOpen(file);
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
