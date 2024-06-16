export function Footer({ data }: { data: any }) {
  const { version, creatorName, creatorVersion, entriesNum, totalTime } = data;
  return (
    <div
      id="footer"
      className="flex flex-row gap-8 bg-accent-950 text-white text-sm py-1 px-2 drop-shadow-lg"
    >
      <div>HAR Version: {version}</div>
      <div>
        Creator: {creatorName} {creatorVersion}
      </div>
      <div>Entries in list: {entriesNum}</div>
      <div>
        Total time: {(totalTime / 1000).toFixed(2)} s ({totalTime} ms)
      </div>
    </div>
  );
}
