import { type AppStore, useAppStore } from "../store/store";
import { FileTab } from "./FileTab";

export function FileTabs(): JSX.Element {
  const files = useAppStore((state: AppStore) =>
    state.files.map((file) => ({
      fileId: file.fileId,
      name: file.name,
    })),
  );
  return (
    <div className="ml-8 flex flex-row gap-2">
      {files.map((file: any) => {
        return <FileTab key={file.fileId} file={file} />;
      })}
    </div>
  );
}
