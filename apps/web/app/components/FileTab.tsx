import { removeFile } from "../store/actions";

interface FileTabProps {
  file: {
    name: string;
    fileId: string;
  };
}

export function FileTab({ file }: FileTabProps): JSX.Element {
  const { name, fileId } = file;

  return (
    <div className="border-accent-100 bg-accent-700 flex select-none items-center justify-center rounded-lg px-4 py-0 pr-1 text-sm font-bold text-white">
      {name}
      <span
        className="hover:bg-accent-800 bg-accent-700 ml-2 rounded-md px-2 py-1 font-bold text-white transition-colors duration-200 dark:hover:text-white"
        onClick={() => removeFile(fileId)}
      >
        ⨉
      </span>
    </div>
  );
}
