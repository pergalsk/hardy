import { describe, it, expect } from "vitest";
import { formatNumber } from "./formatNumber";

describe("formatNumber", () => {
  it("formats numbers below 1000 without separator", () => {
    expect(formatNumber(0)).toBe("0");
    expect(formatNumber(999)).toBe("999");
  });

  it("inserts spaces as thousands separator", () => {
    expect(formatNumber(1000)).toBe("1 000");
    expect(formatNumber(1000000)).toBe("1 000 000");
    expect(formatNumber(123456789)).toBe("123 456 789");
  });

  it("works with negative numbers", () => {
    expect(formatNumber(-1000)).toBe("-1 000");
  });
});
