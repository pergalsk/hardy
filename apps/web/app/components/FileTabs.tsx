import type React from "react";
import { useShallow } from "zustand/shallow";
import { useAppStore } from "../store/store";
import { selectFiles } from "../store/selectors";
import { FileTab } from "./FileTab";

export function FileTabs(): React.JSX.Element {
  // useShallow prevents re-renders when selectFiles
  // returns a new array with the same file references.
  const files = useAppStore(useShallow(selectFiles));

  return (
    <div className="ml-8 flex h-full flex-row gap-2">
      {files.map((file: any) => {
        return <FileTab key={file.fileId} file={file} />;
      })}
    </div>
  );
}
