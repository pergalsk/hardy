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
    <div className="border-accent-100 bg-accent-700 flex select-none items-center justify-center rounded-md py-0 pl-3 pr-0.5 text-sm font-bold text-white">
      <span className="relative top-[1px]">{name}</span>
      <span
        className="hover:bg-accent-800 bg-accent-700 ml-2 flex rounded-md p-1 align-middle text-white transition-colors duration-200 dark:hover:text-white"
        onClick={() => removeFile(fileId)}
      >
        <span className="iconify material-symbols--close-rounded my-auto text-[1rem]"></span>
      </span>
    </div>
  );
}
