import type { Entry } from "@repo/har-types";
import type { ListItem } from "../types";

export function deriveListData(entries: Entry[] | null): ListItem[] {
  if (!Array.isArray(entries)) return [];

  return entries.map((entry, index) => {
    const { pageref, startedDateTime, time, request, response } = entry;
    const { method, url } = request;
    const { status, statusText } = response;
    return { $$id: index, $$visible: false, $$hidden: false, pageref, status, statusText, url, method, startedDateTime, time };
  });
}
