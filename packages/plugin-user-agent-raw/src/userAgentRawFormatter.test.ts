import { describe, it, expect } from "vitest";
import { userAgentRawFormatter } from "./index";

const chromeUserAgent =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

describe("userAgentRawFormatter", () => {
  it("has correct id and title", () => {
    expect(userAgentRawFormatter.id).toBe("user-agent-raw-formatter");
    expect(userAgentRawFormatter.title).toBe("Original");
  });

  it("returns the raw user agent string unchanged", () => {
    const result = userAgentRawFormatter.format({
      name: "User-Agent",
      value: chromeUserAgent,
    });
    expect(result).toBe(chromeUserAgent);
  });

  it("returns empty string for null value", () => {
    const result = userAgentRawFormatter.format({
      name: "User-Agent",
      value: null,
    });
    expect(result).toBe("");
  });

  it("returns the value verbatim for any string", () => {
    const value = "custom/agent 1.0";
    const result = userAgentRawFormatter.format({ name: "User-Agent", value });
    expect(result).toBe(value);
  });
});
