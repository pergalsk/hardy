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
    <div className="dark:bg-bunker-900 dark:text-mirage-200 border-accent-100 bg-accent-700 flex cursor-default select-none items-center justify-center rounded-lg px-4 py-0 pr-1 text-sm font-bold text-white">
      {name}
      <span
        className="hover:bg-accent-800 dark:bg-bunker-600 dark:hover:bg-accent-600 dark:text-mirage-200 bg-accent-700 ml-2 cursor-pointer rounded-md px-2 py-1 font-bold text-white transition-colors duration-200 dark:hover:text-white"
        onClick={() => removeFile(fileId)}
      >
        ⨉
      </span>
    </div>
  );
}
