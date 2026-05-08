import { describe, it, expect } from "vitest";
import type { Entry } from "@repo/har-types";
import { deriveListData } from "./deriveListData";

const makeEntry = (overrides: Record<string, unknown> = {}) =>
  ({
    pageref: "page_1",
    startedDateTime: "2024-01-01T00:00:00.000Z",
    time: 42,
    request: { method: "GET", url: "https://example.com/api" },
    response: { status: 200, statusText: "OK" },
    ...overrides,
  }) as unknown as Entry;

describe("deriveListData", () => {
  it("returns empty array for null input", () => {
    expect(deriveListData(null)).toEqual([]);
  });

  it("returns empty array for non-array input", () => {
    expect(deriveListData({} as never)).toEqual([]);
    expect(deriveListData("string" as never)).toEqual([]);
  });

  it("returns empty array for an empty entries array", () => {
    expect(deriveListData([])).toEqual([]);
  });

  it("maps a single entry to a ListItem with correct fields", () => {
    const result = deriveListData([makeEntry()]);
    expect(result).toHaveLength(1);
    expect(result[0]).toEqual({
      $$id: 0,
      $$visible: false,
      $$hidden: false,
      pageref: "page_1",
      startedDateTime: "2024-01-01T00:00:00.000Z",
      time: 42,
      method: "GET",
      url: "https://example.com/api",
      status: 200,
      statusText: "OK",
    });
  });

  it("assigns sequential $$id values starting at 0", () => {
    const entries = [makeEntry(), makeEntry(), makeEntry()];
    const result = deriveListData(entries);
    expect(result.map((item) => item.$$id)).toEqual([0, 1, 2]);
  });

  it("initialises $$visible and $$hidden as false for all items", () => {
    const result = deriveListData([makeEntry(), makeEntry()]);
    expect(result.every((item) => item.$$visible === false)).toBe(true);
    expect(result.every((item) => item.$$hidden === false)).toBe(true);
  });

  it("passes through undefined pageref", () => {
    const entry = makeEntry({ pageref: undefined });
    const result = deriveListData([entry]);
    expect(result[0].pageref).toBeUndefined();
  });

  it("preserves each entry's distinct field values", () => {
    const entries = [
      makeEntry({ request: { method: "GET", url: "https://a.com" }, response: { status: 200, statusText: "OK" } }),
      makeEntry({ request: { method: "POST", url: "https://b.com" }, response: { status: 201, statusText: "Created" } }),
    ];
    const result = deriveListData(entries);
    expect(result[0].method).toBe("GET");
    expect(result[1].method).toBe("POST");
    expect(result[0].status).toBe(200);
    expect(result[1].status).toBe(201);
  });
});
