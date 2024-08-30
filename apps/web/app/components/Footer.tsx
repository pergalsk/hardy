import { useAppStore } from "../store/store";
import { selectFooterData } from "../store/selectors";

export function Footer() {
  const data = useAppStore(selectFooterData);

  if (!data) {
    return (
      <div
        id="footer"
        className="dark:bg-bunker-600 dark:text-mirage-400 flex flex-row gap-8 bg-slate-300 px-2 py-1 text-sm text-slate-600 drop-shadow-lg"
      >
        Open HAR file
      </div>
    );
  }

  const { version, creatorName, creatorVersion, entriesNum, totalTime } = data;

  return (
    <div
      id="footer"
      className="bg-accent-700 dark:bg-accent-950 flex flex-row gap-8 px-2 py-1 text-sm text-white drop-shadow-lg dark:text-white"
    >
      <div>
        <span className="text-accent-100 dark:text-accent-200">Entries:</span>{" "}
        <span>{entriesNum ?? "--"}</span>
      </div>

      <div>
        <span className="text-accent-100 dark:text-accent-200">
          Total time:
        </span>{" "}
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
        <span className="text-accent-100 dark:text-accent-200">HAR:</span>{" "}
        <span>{version ? "v" + version : "--"}</span>
      </div>

      <div>
        <span className="text-accent-100 dark:text-accent-200">Creator:</span>{" "}
        <span>{creatorName ?? "--"}</span>{" "}
        {creatorVersion && <span>{creatorVersion}</span>}
      </div>
    </div>
  );
}
