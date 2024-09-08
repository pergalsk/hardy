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
    <div className="border-accent-100 bg-accent-700 flex select-none items-center justify-center gap-1 rounded-md py-0 pl-2 pr-0.5 text-sm font-bold text-white">
      <span className="iconify material-symbols--lab-profile-outline-rounded relative bottom-[0.02em] text-lg"></span>
      <span>{name}</span>
      <span
        className="hover:bg-accent-800 bg-accent-700 flex rounded-md p-1 align-middle text-white transition-colors duration-200 dark:hover:text-white"
        onClick={() => removeFile(fileId)}
      >
        <span className="iconify material-symbols--close-rounded my-auto text-[1rem]"></span>
      </span>
    </div>
  );
}
