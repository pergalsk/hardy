import { describe, it, expect } from "vitest";
import { formatFileSize } from "./formatFileSize";

describe("formatFileSize", () => {
  it("formats bytes", () => {
    expect(formatFileSize(0)).toBe("0 B");
    expect(formatFileSize(500)).toBe("500 B");
    expect(formatFileSize(1023)).toBe("1023 B");
  });

  it("formats kilobytes", () => {
    expect(formatFileSize(1024)).toBe("1 kB");
    expect(formatFileSize(2048)).toBe("2 kB");
    expect(formatFileSize(5120)).toBe("5 kB");
    expect(formatFileSize(10240)).toBe("10 kB");
  });

  it("formats megabytes", () => {
    expect(formatFileSize(1048576)).toBe("1 MB");
    expect(formatFileSize(5 * 1048576)).toBe("5 MB");
  });

  it("returns N/A for negative values", () => {
    expect(formatFileSize(-1)).toBe("N/A");
  });

  it("returns N/A for non-finite values", () => {
    expect(formatFileSize(Infinity)).toBe("N/A");
    expect(formatFileSize(NaN)).toBe("N/A");
  });
});
