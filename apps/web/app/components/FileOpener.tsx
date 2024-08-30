"use client";
import React from "react";
import { readFileData } from "../helpers/helpers";
import { nanoid } from "../helpers/nanoid";
import { addFile, setRowId } from "../store/actions";

export const FileOpener = () => {
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
        className="bg-accent-800 hover:bg-accent-600 upper flex rounded-lg px-8 py-4 align-middle font-bold uppercase text-white transition-colors duration-200"
        onClick={openFileSelector}
      >
        <span className="iconify material-symbols--folder-open-outline-rounded my-auto mr-3 text-2xl"></span>
        <span className="my-auto align-middle">Open HAR file</span>
      </button>
    </>
  );
};
