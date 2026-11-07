import type { TabCode } from "../../store/store";

export type SearchSection =
  | "url"
  | "reqHeader"
  | "reqBody"
  | "resHeader"
  | "resBody"
  | "reqCookie"
  | "resCookie";

export type SearchField = {
  entryId: number;
  section: SearchSection;
  label: string;
  text: string;
  lower: string;
};

export type SearchMatch = {
  entryId: number;
  section: SearchSection;
  label: string;
  before: string;
  match: string;
  after: string;
};

export const sectionTabs: Record<SearchSection, TabCode> = {
  url: "REQ",
  reqHeader: "REQ",
  reqBody: "REQ",
  resHeader: "RES",
  resBody: "RES",
  reqCookie: "COO",
  resCookie: "COO",
};

export const sectionTitles: Record<SearchSection, string> = {
  url: "URL",
  reqHeader: "Request header",
  reqBody: "Request body",
  resHeader: "Response header",
  resBody: "Response body",
  reqCookie: "Request cookie",
  resCookie: "Response cookie",
};
