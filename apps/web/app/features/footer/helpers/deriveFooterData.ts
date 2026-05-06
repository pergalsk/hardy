import type { Log } from "@repo/har-types";

export type FooterData = {
  version: string;
  fileSize: number;
  creatorName: string | undefined;
  creatorVersion: string | undefined;
  entriesNum: number;
  totalTime: number;
};

export function deriveFooterData(harData: Log | null | undefined, fileSize: number): FooterData | null {
  if (!harData) return null;

  const { version, creator, entries } = harData;

  return {
    version,
    fileSize,
    creatorName: creator?.name,
    creatorVersion: creator?.version,
    entriesNum: entries?.length || 0,
    totalTime: entries?.reduce((acc: number, entry) => acc + entry.time, 0) || 0,
  };
}
