import { MagnifyingGlassSvg } from "./MagnifyingGlassSvg";

export function NoData({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <div className="flex flex-col justify-center items-center h-full">
      <MagnifyingGlassSvg />
      <h1 className="text-lg font-bold uppercase text-center text-mirage-900">
        {children || "No data here"}
      </h1>
    </div>
  );
}
