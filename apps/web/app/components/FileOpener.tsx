"use client";
import React from "react";
import { readFileData } from "../helpers/helpers";
import { nanoid } from "../helpers/nanoid";
import { useAppStore, selectAddFile, selectSetRowId } from "../store/store";

export const FileOpener = () => {
  const addFile = useAppStore(selectAddFile);
  const setRowId = useAppStore(selectSetRowId);

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
    const fileId = nanoid();

    try {
      const fileData = await readFileData(file);
      const data = JSON.parse(fileData);
      addFile({ fileId, name, size, data });
      setRowId(1); // reset rowId to 1 (first entry in the list)
    } catch (error) {
      console.error("Error loading file:", error);
      // todo: modal with warning
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
