import { useAppStore } from "../store/store";
import { selectFileTabs } from "../store/selectors";
import { FileTab } from "./FileTab";

export function FileTabs(): JSX.Element {
  const files = useAppStore(selectFileTabs);

  return (
    <div className="ml-8 flex flex-row gap-2">
      {files.map((file: any) => {
        return <FileTab key={file.fileId} file={file} />;
      })}
    </div>
  );
}
