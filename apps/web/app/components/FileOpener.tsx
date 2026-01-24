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

export const FileOpener = ({ children }: { children?: React.ReactNode }) => {
  const ref = useRef<HTMLInputElement>(null);

  const openFileSelector = () => {
    ref.current?.click();
  };

  // prepare the visible trigger based on children
  let trigger: React.ReactNode = null;

  if (React.isValidElement(children)) {
    const childProps = (children.props as any) || {};
    const existingOnClick = childProps.onClick;
    const mergedOnClick = (e?: any) => {
      try {
        existingOnClick && existingOnClick(e);
      } finally {
        openFileSelector();
      }
    };

    trigger = React.cloneElement(children as React.ReactElement, {
      onClick: mergedOnClick,
    });
  } else if (children != null) {
    // non-element children (string, nodes) - wrap in a clickable container
    trigger = <div onClick={openFileSelector}>{children}</div>;
  }

  return (
    <>
      <input
        ref={ref}
        type="file"
        accept=".har"
        onChange={processInputFile}
        className="hidden"
      />
      {trigger}
    </>
  );
};
