"use client";
import React from "react";
import { readFileData } from "../helpers/helpers";
import { nanoid } from "../helpers/nanoid";
import { useAppStore } from "../store/store";
import { selectAddFile, selectSetRowId } from "../store/selectors";

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
      setRowId(0);
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
        className="bg-accent-800 hover:bg-accent-600 rounded-lg px-8 py-4 text-lg font-bold text-white transition-colors duration-200"
        onClick={openFileSelector}
      >
        Open HAR file
      </button>
    </>
  );
};
