import { MagnifyingGlassSvg } from "./MagnifyingGlassSvg";

export function NoContent({
  children,
  showIcon,
}: {
  children?: React.ReactNode;
  showIcon?: boolean;
}): JSX.Element {
  return (
    <div className="flex h-full flex-col items-center justify-center">
      {showIcon && <MagnifyingGlassSvg />}
      <h1 className="dark:text-mirage-800 select-none text-center font-bold uppercase text-slate-200">
        {children || "No content here"}
      </h1>
    </div>
  );
}
