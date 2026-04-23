import { useMemo } from "react";
import { NA } from "@repo/ui/na";
import { useAppStore } from "../../../store/store";
import { selectHarData, selectFileSize } from "../../../core/selectors";
import { selectFilter } from "../../list/selectors";
import { deriveFooterData } from "../helpers/deriveFooterData";
import { formatNumber } from "../../../core/helpers/formatNumber";
import { formatFileSize } from "../../../core/helpers/formatFileSize";
import { formatThousands } from "../../../core/helpers/formatThousands";
import { FooterItem } from "./FooterItem";

export function FooterEmpty() {
  return (
    <div
      id="footer"
      className="dark:bg-bunker-600 dark:text-mirage-400 flex flex-row gap-8 bg-slate-300 px-2 py-1 text-sm text-slate-600 drop-shadow-lg"
    >
      Open HAR file
    </div>
  );
}

export function Footer() {
  const harData = useAppStore(selectHarData);
  const fileSize = useAppStore(selectFileSize);
  const { count } = useAppStore(selectFilter);

  const data = useMemo(
    () => deriveFooterData(harData, fileSize),
    [harData, fileSize],
  );

  if (!data) {
    return <FooterEmpty />;
  }

  const { version, creatorName, creatorVersion, entriesNum, totalTime } = data;

  const filteredNum =
    count >= 0 && count !== entriesNum ? ` (filtered: ${count})` : "";

  return (
    <div
      id="footer"
      className="bg-accent-700 dark:bg-accent-950 flex flex-row gap-8 px-2 py-1 text-sm text-white drop-shadow-lg dark:text-white"
    >
      <FooterItem label="Entries" value={entriesNum} extra={filteredNum} />

      <FooterItem
        label="Total time"
        value={totalTime ? `${(totalTime / 1000).toFixed(2)} s` : null}
        extra={totalTime ? `(${formatNumber(totalTime)} ms)` : null}
      />

      <FooterItem
        label="File size"
        value={formatFileSize(fileSize)}
        extra={`(${formatThousands(fileSize)} B)`}
      />

      <div className="ml-auto"></div>

      <FooterItem label="HAR" value={version ? "v" + version : NA} />

      <FooterItem
        label="Creator"
        value={creatorName ? creatorName + " " + creatorVersion : NA}
      />
    </div>
  );
}
