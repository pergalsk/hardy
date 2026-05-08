import { describe, it, expect } from "vitest";
import type { Entry } from "@repo/har-types";
import { deriveTabData } from "./deriveTabData";

const makeEntry = (overrides: Record<string, unknown> = {}) =>
  ({
    request: {
      method: "GET",
      url: "https://example.com",
      httpVersion: "HTTP/1.1",
      headers: [{ name: "Accept", value: "*/*" }],
      cookies: [{ name: "sid", value: "abc" }],
      headersSize: 64,
      bodySize: 0,
    },
    response: {
      status: 200,
      statusText: "OK",
      httpVersion: "HTTP/1.1",
      headers: [{ name: "Content-Type", value: "application/json" }],
      cookies: [{ name: "set-sid", value: "xyz" }],
      headersSize: 128,
      bodySize: 42,
      content: { size: 42, mimeType: "application/json", text: '{"ok":true}' },
    },
    timings: { send: 1, wait: 50, receive: 5 },
    time: 56,
    ...overrides,
  }) as unknown as Entry;

describe("deriveTabData", () => {
  it("returns null for null entry", () => {
    expect(deriveTabData(null, "REQ")).toBeNull();
  });

  it("returns null for unknown tabCode", () => {
    expect(deriveTabData(makeEntry(), "UNKNOWN" as never)).toBeNull();
  });

  describe("REQ tab", () => {
    it("extracts request headers, sizes, and postData text", () => {
      const entry = makeEntry({
        request: {
          method: "POST",
          url: "https://example.com",
          httpVersion: "HTTP/1.1",
          headers: [{ name: "Content-Type", value: "application/json" }],
          cookies: [],
          headersSize: 80,
          bodySize: 15,
          postData: { mimeType: "application/json", text: '{"a":1}' },
        },
      });
      const result = deriveTabData(entry, "REQ");
      expect(result).toEqual({
        headers: [{ name: "Content-Type", value: "application/json" }],
        headersSize: 80,
        bodySize: 15,
        content: '{"a":1}',
      });
    });

    it("returns undefined content when postData is absent", () => {
      const result = deriveTabData(makeEntry(), "REQ");
      expect((result as { content: unknown })?.content).toBeUndefined();
    });
  });

  describe("RES tab", () => {
    it("extracts response headers, sizes, and content text", () => {
      const result = deriveTabData(makeEntry(), "RES");
      expect(result).toEqual({
        headers: [{ name: "Content-Type", value: "application/json" }],
        headersSize: 128,
        bodySize: 42,
        content: '{"ok":true}',
      });
    });

    it("returns undefined content when response content has no text", () => {
      const entry = makeEntry();
      (entry.response.content as Record<string, unknown>).text = undefined;
      const result = deriveTabData(entry, "RES");
      expect((result as { content: unknown })?.content).toBeUndefined();
    });
  });

  describe("COO tab", () => {
    it("extracts request and response cookies", () => {
      const result = deriveTabData(makeEntry(), "COO");
      expect(result).toEqual({
        cookies: {
          request: [{ name: "sid", value: "abc" }],
          response: [{ name: "set-sid", value: "xyz" }],
        },
      });
    });

    it("handles empty cookie arrays", () => {
      const entry = makeEntry();
      entry.request.cookies = [];
      entry.response.cookies = [];
      const result = deriveTabData(entry, "COO");
      expect(result).toEqual({ cookies: { request: [], response: [] } });
    });
  });

  describe("TIM tab", () => {
    it("extracts timings and totalTime", () => {
      const result = deriveTabData(makeEntry(), "TIM");
      expect(result).toEqual({
        timings: { send: 1, wait: 50, receive: 5 },
        totalTime: 56,
      });
    });

    it("preserves totalTime of zero", () => {
      const entry = makeEntry({ time: 0 });
      const result = deriveTabData(entry, "TIM");
      expect((result as { totalTime: number })?.totalTime).toBe(0);
    });
  });
});
