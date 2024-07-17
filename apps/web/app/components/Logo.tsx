export function Logo(): JSX.Element {
  return (
    <div className="mb-2 flex content-center gap-3 text-lg font-black tracking-wide">
      <div className="rounded-lg bg-yellow-400 px-3 py-1 text-black dark:bg-yellow-500">
        HARDY
      </div>
      <div className="flex items-center text-black dark:text-white">
        HAR viewer
      </div>
    </div>
  );
}
