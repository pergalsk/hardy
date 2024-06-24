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
    <div className="bg-bunker-700 text-mirage-200 flex cursor-default select-none items-center justify-center rounded-lg px-3 py-1 pr-1.5 text-sm font-bold">
      {name}
      <span
        className="bg-bunker-700 hover:bg-accent-600 ml-2 cursor-pointer rounded px-1.5 py-0.5 font-bold transition-colors duration-200 hover:text-white"
        onClick={() => removeFile(fileId)}
      >
        ⨉
      </span>
    </div>
  );
}
