/** Search sections shared by the search index and the detail panel. */
export const SEARCH_SECTIONS = {
  url: "url",
  reqHeader: "reqHeader",
  reqBody: "reqBody",
  resHeader: "resHeader",
  resBody: "resBody",
  reqCookie: "reqCookie",
  resCookie: "resCookie",
} as const;

export type SearchSection = (typeof SEARCH_SECTIONS)[keyof typeof SEARCH_SECTIONS];

const SECTION_ATTR = "data-search-section";

/** Props that mark a detail element as the highlight container of a section. */
export const searchSectionProps = (section: SearchSection) => ({
  [SECTION_ATTR]: section,
});

/** CSS selector for the element marked with `searchSectionProps(section)`. */
export const searchSectionSelector = (section: SearchSection) =>
  `[${SECTION_ATTR}="${section}"]`;
