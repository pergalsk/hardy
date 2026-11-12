import type { Har, Log } from "@repo/har-types";

/**
 * Builds a new HAR that contains only the given entries.
 *
 * @param har original HAR data
 * @param ids indexes into `har.log.entries`
 * @returns new HAR with the selected entries and the pages they use
 */
export function buildFilteredHar(har: Har, ids: number[]): Har {
  const { version, creator, browser, pages } = har.log;
  const idSet = new Set(ids);
  const entries = har.log.entries.filter((_, index) => idSet.has(index));

  const usedPageRefs = new Set(entries.map((entry) => entry.pageref));

  const log: Log = { version, creator, entries };

  if (browser) log.browser = browser;
  if (pages) log.pages = pages.filter((page) => usedPageRefs.has(page.id));

  return { log };
}

/** `name.har` -> `name-filtered.har` */
export const getFilteredFileName = (name: string) =>
  `${name.replace(/\.har$/i, "")}-filtered.har`;
