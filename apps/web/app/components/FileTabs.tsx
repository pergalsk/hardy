import { FileTab } from "./FileTab";

interface FileTbsProps {
  files: any;
  onClose: (index: number) => () => void;
}

export function FileTabs({ files, onClose }: FileTbsProps): JSX.Element {
  return (
    <div className="ml-8 flex flex-row gap-2">
      {files.map((file: any, index: number) => {
        return (
          <FileTab
            key={file.name}
            file={file}
            index={index}
            onClose={onClose}
          />
        );
      })}
    </div>
  );
}
