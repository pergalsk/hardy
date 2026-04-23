export function deriveFooterData(harData: any, fileSize: number): any {
  if (!harData) return null;

  const { version, creator, entries } = harData;

  return {
    version,
    fileSize,
    creatorName: creator?.name,
    creatorVersion: creator?.version,
    entriesNum: entries?.length || 0,
    totalTime: (
      entries?.reduce((acc: number, entry: any) => acc + entry.time, 0) || 0
    ).toFixed(2),
  };
}
