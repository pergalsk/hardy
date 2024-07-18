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
    <div className="dark:bg-bunker-900 dark:text-mirage-200 border-accent-100 dark:border-accent-700 mt-1 flex cursor-default select-none items-center justify-center rounded-t-xl border-t-2 bg-white px-4 py-0 pr-2 pt-2 text-sm font-bold text-black">
      {name}
      <span
        className="hover:bg-accent-50 dark:bg-bunker-600 dark:hover:bg-accent-600 dark:text-mirage-200 ml-2 cursor-pointer rounded bg-white px-2 py-1 font-bold text-black transition-colors duration-200 dark:hover:text-white"
        onClick={() => removeFile(fileId)}
      >
        ⨉
      </span>
    </div>
  );
}
