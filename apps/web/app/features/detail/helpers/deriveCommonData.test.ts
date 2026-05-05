import { describe, it, expect } from "vitest";
import type { Entry } from "@repo/har-types";
import { deriveCommonData } from "./deriveCommonData";

const makeEntry = (overrides = {}) => ({
  request: { method: "GET", url: "https://example.com/api", httpVersion: "HTTP/1.1" },
  response: { status: 200, statusText: "OK" },
  serverIPAddress: "93.184.216.34",
  time: 123.45,
  _securityState: "secure",
  ...overrides,
});

describe("deriveCommonData", () => {
  it("returns null for falsy input", () => {
    expect(deriveCommonData(null)).toBeNull();
    expect(deriveCommonData(undefined)).toBeNull();
  });

  it("extracts expected fields from a valid entry", () => {
    const result = deriveCommonData(makeEntry() as unknown as Entry);
    expect(result).toEqual({
      status: 200,
      statusText: "OK",
      url: "https://example.com/api",
      method: "GET",
      serverIPAddress: "93.184.216.34",
      time: 123.45,
      httpVersion: "HTTP/1.1",
      _securityState: "secure",
    });
  });

  it("passes through undefined optional fields", () => {
    const entry = makeEntry() as unknown as Entry;
    delete entry.serverIPAddress;
    const result = deriveCommonData(entry);
    expect(result?.serverIPAddress).toBeUndefined();
  });
});
