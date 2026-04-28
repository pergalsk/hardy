import { describe, it, expect } from "vitest";
import { deriveFooterData } from "./deriveFooterData";

const makeHar = (overrides = {}) => ({
  version: "1.2",
  creator: { name: "Chrome", version: "120" },
  entries: [{ time: 100 }, { time: 200 }, { time: 50 }],
  ...overrides,
});

describe("deriveFooterData", () => {
  it("returns null when harData is falsy", () => {
    expect(deriveFooterData(null, 0)).toBeNull();
    expect(deriveFooterData(undefined, 0)).toBeNull();
  });

  it("extracts version, creator, and entry count", () => {
    const result = deriveFooterData(makeHar(), 1024);
    expect(result.version).toBe("1.2");
    expect(result.creatorName).toBe("Chrome");
    expect(result.creatorVersion).toBe("120");
    expect(result.entriesNum).toBe(3);
    expect(result.fileSize).toBe(1024);
  });

  it("computes total time as a fixed-2 string", () => {
    const result = deriveFooterData(makeHar(), 0);
    expect(result.totalTime).toBe("350.00");
  });

  it("returns 0 entries and 0 total time when entries is missing", () => {
    const result = deriveFooterData(makeHar({ entries: undefined }), 0);
    expect(result.entriesNum).toBe(0);
    expect(result.totalTime).toBe("0.00");
  });
});
