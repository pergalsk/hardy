import { MagnifyingGlassSvg } from "./MagnifyingGlassSvg";

export function NoContent({
  children,
}: {
  children?: React.ReactNode;
}): JSX.Element {
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <MagnifyingGlassSvg />
      <h1 className="dark:text-mirage-900 text-center text-lg font-bold uppercase text-slate-200">
        {children || "No content here"}
      </h1>
    </div>
  );
}
