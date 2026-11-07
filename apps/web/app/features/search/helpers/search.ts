import type { Entry } from "@repo/har-types";
import type { SearchField, SearchMatch, SearchSection } from "../types";

const SNIPPET_BEFORE = 40;
const SNIPPET_AFTER = 80;

const TEXT_MIME = /^text\/|json|xml|javascript|html|css|graphql|x-www-form-urlencoded/i;

const isTextMime = (mimeType: string | undefined) =>
  !mimeType || TEXT_MIME.test(mimeType);

const decodeBase64 = (text: string): string => {
  try {
    const bytes = Uint8Array.from(atob(text), (char) => char.charCodeAt(0));
    return new TextDecoder().decode(bytes);
  } catch {
    return text;
  }
};

const getResponseBody = (entry: Entry): string => {
  const { text, mimeType, encoding } = entry.response.content ?? {};
  if (!text || !isTextMime(mimeType)) return "";
  return encoding === "base64" ? decodeBase64(text) : text;
};

const getRequestBody = (entry: Entry): string => {
  const { text, params } = entry.request.postData ?? {};
  if (text) return text;
  return (params ?? []).map(({ name, value }) => `${name}=${value ?? ""}`).join("&");
};

/**
 * Turns HAR entries into a flat list of searchable fields.
 */
export function buildSearchIndex(entries: Entry[] | null): SearchField[] {
  if (!Array.isArray(entries)) return [];

  const fields: SearchField[] = [];

  const add = (entryId: number, section: SearchSection, label: string, text: string) => {
    if (text) fields.push({ entryId, section, label, text, lower: text.toLowerCase() });
  };

  entries.forEach((entry, entryId) => {
    const { request, response } = entry;

    add(entryId, "url", "", request.url);
    request.headers.forEach(({ name, value }) => add(entryId, "reqHeader", name, `${name}: ${value}`));
    add(entryId, "reqBody", "", getRequestBody(entry));
    response.headers.forEach(({ name, value }) => add(entryId, "resHeader", name, `${name}: ${value}`));
    add(entryId, "resBody", "", getResponseBody(entry));
    request.cookies.forEach(({ name, value }) => add(entryId, "reqCookie", name, `${name}=${value}`));
    response.cookies.forEach(({ name, value }) => add(entryId, "resCookie", name, `${name}=${value}`));
  });

  return fields;
}

const oneLine = (text: string) => text.replace(/\s+/g, " ");

/**
 * Case-insensitive substring search. Returns the first match of each field.
 */
export function searchIndex(fields: SearchField[], query: string, limit: number): SearchMatch[] {
  const needle = query.trim().toLowerCase();
  if (!needle) return [];

  const matches: SearchMatch[] = [];

  for (const field of fields) {
    const index = field.lower.indexOf(needle);
    if (index === -1) continue;

    const end = index + needle.length;
    const start = Math.max(0, index - SNIPPET_BEFORE);
    const stop = Math.min(field.text.length, end + SNIPPET_AFTER);

    matches.push({
      entryId: field.entryId,
      section: field.section,
      label: field.label,
      before: (start > 0 ? "…" : "") + oneLine(field.text.slice(start, index)),
      match: field.text.slice(index, end),
      after: oneLine(field.text.slice(end, stop)) + (stop < field.text.length ? "…" : ""),
    });

    if (matches.length >= limit) break;
  }

  return matches;
}
