import { useAppStore, selectRemoveFile } from "../store/store";

interface FileTabProps {
  file: {
    name: string;
    fileId: string;
  };
}

export function FileTab({ file }: FileTabProps): JSX.Element {
  const removeFile = useAppStore(selectRemoveFile);
  const { name, fileId } = file;

  return (
    <div className="bg-bunker-900 text-mirage-200 border-accent-700 mt-1 flex cursor-default select-none items-center justify-center rounded-t-xl border-t-2 px-4 py-0 pr-2 pt-2 text-sm font-bold">
      {name}
      <span
        className="bg-bunker-700 hover:bg-accent-600 ml-2 cursor-pointer rounded px-2 py-1 font-bold transition-colors duration-200 hover:text-white"
        onClick={() => removeFile(fileId)}
      >
        ⨉
      </span>
    </div>
  );
}
