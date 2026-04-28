import { describe, it, expect } from "vitest";
import { getUrlParts } from "./getUrlParts";

describe("getUrlParts", () => {
  it("parses a simple URL", () => {
    const result = getUrlParts("https://example.com/path");
    expect(result.protocol).toBe("https:");
    expect(result.domain).toBe("example.com");
    expect(result.path).toBe("/path");
    expect(result.port).toBe("");
    expect(result.params).toBe("");
    expect(result.hash).toBe("");
  });

  it("parses a URL with query params and hash", () => {
    const result = getUrlParts("https://example.com/search?q=hello&page=2#results");
    expect(result.params).toBe("?q=hello&page=2");
    expect(result.hash).toBe("#results");
  });

  it("parses a URL with a custom port", () => {
    const result = getUrlParts("http://localhost:3000/api");
    expect(result.domain).toBe("localhost");
    expect(result.port).toBe("3000");
    expect(result.path).toBe("/api");
  });
});
