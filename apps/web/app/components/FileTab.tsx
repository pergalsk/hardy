interface FileTabProps {
  file: any;
  index: number;
  onClose: (index: number) => () => void;
}

export function FileTab({ file, index, onClose }: FileTabProps): JSX.Element {
  return (
    <div
      key={file.name}
      className="bg-bunker-700 text-mirage-200 flex cursor-default select-none items-center justify-center rounded-lg px-3 py-1 pr-1.5 text-sm font-bold"
    >
      {file.name}
      <span
        onClick={onClose(index)}
        className="bg-bunker-500 hover:bg-accent-600 ml-2 cursor-pointer rounded px-1.5 py-0.5 font-bold transition-colors duration-200 hover:text-white"
      >
        ⨉
      </span>
    </div>
  );
}
