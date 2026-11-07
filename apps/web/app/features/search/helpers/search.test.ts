import type { Entry } from "@repo/har-types";
import { mockHarEntry } from "../../../../src/test-fixtures";
import { buildSearchIndex, searchIndex } from "./search";

const entry = {
  ...mockHarEntry,
  request: {
    ...mockHarEntry.request,
    url: "https://example.com/api/users?id=42",
    headers: [{ name: "Authorization", value: "Bearer abc123" }],
    cookies: [{ name: "session", value: "xyz789" }],
    postData: { mimeType: "application/json", text: '{"name":"Peter"}' },
  },
  response: {
    ...mockHarEntry.response,
    headers: [{ name: "Set-Cookie", value: "token=qwe" }],
    cookies: [{ name: "token", value: "qwe" }],
    content: { size: 11, mimeType: "application/json", text: '{"ok":true}' },
  },
} as unknown as Entry;

const base64Entry = {
  ...entry,
  response: {
    ...entry.response,
    content: { size: 5, mimeType: "text/plain", text: btoa("hello world"), encoding: "base64" },
  },
} as unknown as Entry;

const imageEntry = {
  ...entry,
  response: {
    ...entry.response,
    content: { size: 5, mimeType: "image/png", text: "secretpixels" },
  },
} as unknown as Entry;

describe("buildSearchIndex", () => {
  it("returns empty list for null", () => {
    expect(buildSearchIndex(null)).toEqual([]);
  });

  it("indexes all sections", () => {
    const sections = buildSearchIndex([entry]).map((field) => field.section);
    expect(sections).toEqual([
      "url",
      "reqHeader",
      "reqBody",
      "resHeader",
      "resBody",
      "reqCookie",
      "resCookie",
    ]);
  });

  it("decodes base64 text bodies", () => {
    const body = buildSearchIndex([base64Entry]).find((f) => f.section === "resBody");
    expect(body?.text).toBe("hello world");
  });

  it("skips binary bodies", () => {
    const body = buildSearchIndex([imageEntry]).find((f) => f.section === "resBody");
    expect(body).toBeUndefined();
  });

  it("uses form params when request has no text", () => {
    const formEntry = {
      ...entry,
      request: {
        ...entry.request,
        postData: { mimeType: "application/x-www-form-urlencoded", params: [{ name: "a", value: "1" }] },
      },
    } as unknown as Entry;
    const body = buildSearchIndex([formEntry]).find((f) => f.section === "reqBody");
    expect(body?.text).toBe("a=1");
  });
});

describe("searchIndex", () => {
  const index = buildSearchIndex([entry, mockHarEntry as unknown as Entry]);

  it("returns nothing for empty query", () => {
    expect(searchIndex(index, "  ", 10)).toEqual([]);
  });

  it("finds case-insensitive matches with snippet and entry id", () => {
    const [match] = searchIndex(index, "BEARER", 10);
    expect(match).toEqual({
      entryId: 0,
      section: "reqHeader",
      label: "Authorization",
      before: "Authorization: ",
      match: "Bearer",
      after: " abc123",
    });
  });

  it("finds matches in cookies and bodies", () => {
    expect(searchIndex(index, "xyz789", 10)[0]?.section).toBe("reqCookie");
    expect(searchIndex(index, "peter", 10)[0]?.section).toBe("reqBody");
  });

  it("finds matches across entries", () => {
    const entryIds = searchIndex(index, "example.com", 10).map((m) => m.entryId);
    expect(entryIds).toEqual([0, 1]);
  });

  it("respects the limit", () => {
    expect(searchIndex(index, "e", 2)).toHaveLength(2);
  });

  it("shortens long snippets", () => {
    const longIndex = buildSearchIndex([
      { ...entry, request: { ...entry.request, url: `${"a".repeat(100)}NEEDLE${"b".repeat(100)}` } } as Entry,
    ]);
    const [match] = searchIndex(longIndex, "needle", 10);
    expect(match?.before.startsWith("…")).toBe(true);
    expect(match?.after.endsWith("…")).toBe(true);
  });
});
