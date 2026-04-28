import { describe, it, expect } from "vitest";
import { formatDateTime, leadingZero } from "./formatDateTime";

describe("leadingZero", () => {
  it("pads single-digit numbers", () => {
    expect(leadingZero(0)).toBe("00");
    expect(leadingZero(9)).toBe("09");
  });

  it("does not pad two-digit numbers", () => {
    expect(leadingZero(10)).toBe("10");
    expect(leadingZero(59)).toBe("59");
  });
});

describe("formatDateTime", () => {
  it("formats a full date-time string", () => {
    const result = formatDateTime("2024-03-15T14:05:06.789Z");
    expect(result).toMatch(/^\d{2}\.\d{2}\.\d{4} \d+:\d{2}:\d{2}\.\d+$/);
  });

  it("returns time-only format when timeOnly is true", () => {
    const result = formatDateTime("2024-03-15T14:05:06.789Z", true);
    expect(result).toMatch(/^\d+:\d{2}:\d{2}\.\d+$/);
  });

  it("time-only result omits the date portion", () => {
    const full = formatDateTime("2024-03-15T14:05:06.789Z", false);
    const timeOnly = formatDateTime("2024-03-15T14:05:06.789Z", true);
    expect(full.length).toBeGreaterThan(timeOnly.length);
    expect(full).toContain(timeOnly);
  });
});
