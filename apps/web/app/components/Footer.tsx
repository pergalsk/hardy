import { useAppStore, selectFooterData } from "../store/store";

export function Footer() {
  const data = useAppStore(selectFooterData);

  if (!data) {
    return (
      <div
        id="footer"
        className="bg-bunker-600 text-mirage-400 flex flex-row gap-8 px-2 py-1 text-sm drop-shadow-lg"
      >
        Open HAR file
      </div>
    );
  }

  const { version, creatorName, creatorVersion, entriesNum, totalTime } = data;

  return (
    <div
      id="footer"
      className="bg-accent-950 flex flex-row gap-8 px-2 py-1 text-sm text-white drop-shadow-lg"
    >
      <div>
        <span className="text-accent-200">Entries:</span>{" "}
        <span>{entriesNum ?? "--"}</span>
      </div>

      <div>
        <span className="text-accent-200">Total time:</span>{" "}
        {totalTime ? (
          <>
            <span>{(totalTime / 1000).toFixed(2) ?? "--"} s</span>{" "}
            <span className="text-accent-50">({totalTime ?? "--"} ms)</span>
          </>
        ) : (
          "--"
        )}
      </div>

      <div className="ml-auto">
        <span className="text-accent-200">HAR:</span>{" "}
        <span>{version ? "v" + version : "--"}</span>
      </div>

      <div>
        <span className="text-accent-200">Creator:</span>{" "}
        <span>{creatorName ?? "--"}</span>{" "}
        {creatorVersion && <span>{creatorVersion}</span>}
      </div>
    </div>
  );
}
