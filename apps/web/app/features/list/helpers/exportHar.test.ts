import { isHar } from "@repo/har-types";
import type { Entry, Har } from "@repo/har-types";
import { buildFilteredHar, getFilteredFileName } from "./exportHar";

const entry = (url: string, pageref?: string) =>
  ({
    pageref,
    startedDateTime: "2024-01-01T10:00:00.000Z",
    time: 10,
    request: { method: "GET", url },
    response: { status: 200, statusText: "OK" },
  }) as unknown as Entry;

const page = (id: string) => ({
  id,
  title: id,
  startedDateTime: "2024-01-01T10:00:00.000Z",
  pageTimings: {},
});

const har: Har = {
  log: {
    version: "1.2",
    creator: { name: "Creator", version: "1.0" },
    browser: { name: "Browser", version: "2.0" },
    pages: [page("p1"), page("p2"), page("p3")],
    entries: [
      entry("https://a.com/0", "p1"),
      entry("https://a.com/1", "p2"),
      entry("https://a.com/2", "p2"),
      entry("https://a.com/3", "p3"),
    ],
  },
};

const hasDollarKeys = (value: unknown): boolean =>
  typeof value === "object" &&
  value !== null &&
  Object.entries(value).some(
    ([key, child]) => key.startsWith("$$") || hasDollarKeys(child),
  );

describe("buildFilteredHar", () => {
  it("keeps only entries with given ids, in original order", () => {
    const result = buildFilteredHar(har, [2, 0]);
    expect(result.log.entries).toEqual([har.log.entries[0], har.log.entries[2]]);
  });

  it("keeps version, creator and browser", () => {
    const { log } = buildFilteredHar(har, [0]);
    expect(log.version).toBe("1.2");
    expect(log.creator).toEqual(har.log.creator);
    expect(log.browser).toEqual(har.log.browser);
  });

  it("keeps only pages used by exported entries", () => {
    const { log } = buildFilteredHar(har, [1, 2]);
    expect(log.pages?.map((p) => p.id)).toEqual(["p2"]);
  });

  it("drops all pages when no entry uses them", () => {
    const { log } = buildFilteredHar(har, []);
    expect(log.entries).toEqual([]);
    expect(log.pages).toEqual([]);
  });

  it("does not add pages or browser when original has none", () => {
    const { log } = buildFilteredHar(
      { log: { version: "1.2", creator: har.log.creator, entries: [entry("x")] } },
      [0],
    );
    expect(log).not.toHaveProperty("pages");
    expect(log).not.toHaveProperty("browser");
  });

  it("output has no $$ fields", () => {
    const result = buildFilteredHar(har, [0, 1, 2, 3]);
    expect(hasDollarKeys(result)).toBe(false);
  });

  it("output passes isHar", () => {
    expect(isHar(buildFilteredHar(har, [3]))).toBe(true);
  });

  it("does not change the original data", () => {
    const copy = structuredClone(har);
    buildFilteredHar(har, [0]);
    expect(har).toEqual(copy);
  });
});

describe("getFilteredFileName", () => {
  it("replaces .har extension", () => {
    expect(getFilteredFileName("session.har")).toBe("session-filtered.har");
    expect(getFilteredFileName("session.HAR")).toBe("session-filtered.har");
  });

  it("appends suffix when there is no .har extension", () => {
    expect(getFilteredFileName("session")).toBe("session-filtered.har");
  });
});
