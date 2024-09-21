"use client";
import React, { useRef } from "react";
import { openFile } from "../helpers/openFile";
import { WrongFile } from "./WrongFile";

const processInputFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (!file) {
    return;
  }
  openFile(file, <WrongFile name={file.name} />);
};

export const FileOpener = () => {
  const ref = useRef<HTMLInputElement>(null);

  const openFileSelector = () => {
    ref.current?.click();
  };

  return (
    <>
      <input
        ref={ref}
        type="file"
        accept=".har"
        onChange={processInputFile}
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
