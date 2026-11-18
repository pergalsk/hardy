import type { Entry } from "@repo/har-types";
import { mockHarEntry } from "../../../../src/test-fixtures";
import { getCommonData, getTabData } from "./detailEntry";

const entry = {
  ...mockHarEntry,
  request: {
    ...mockHarEntry.request,
    method: "POST",
    headers: [{ name: "Content-Type", value: "application/x-www-form-urlencoded" }],
    cookies: [{ name: "session", value: "abc123", path: "/", httpOnly: true }],
    headersSize: 90,
    bodySize: 28,
    postData: {
      mimeType: "application/x-www-form-urlencoded",
      text: "username=bob&password=secret",
    },
  },
  response: {
    ...mockHarEntry.response,
    cookies: [{ name: "theme", value: "dark", path: "/" }],
  },
  timings: { blocked: 5, dns: 10, connect: 15, ssl: 5, send: 5, wait: 50, receive: 10 },
  time: 100,
} as unknown as Entry;

describe("getCommonData", () => {
  it("collects the summary fields of an entry", () => {
    expect(getCommonData(entry)).toEqual({
      status: 200,
      statusText: "OK",
      url: "https://example.com/api/test",
      method: "POST",
      serverIPAddress: "93.184.216.34",
      time: 100,
      httpVersion: "HTTP/1.1",
      _securityState: "secure",
    });
  });

  it("leaves optional fields undefined when the HAR omits them", () => {
    const bare = { ...entry, serverIPAddress: undefined, _securityState: undefined };
    const data = getCommonData(bare);
    expect(data.serverIPAddress).toBeUndefined();
    expect(data._securityState).toBeUndefined();
  });
});

describe("getTabData", () => {
  it("REQ: request headers, sizes and post body", () => {
    expect(getTabData(entry, "REQ")).toEqual({
      tab: "REQ",
      data: {
        headers: [{ name: "Content-Type", value: "application/x-www-form-urlencoded" }],
        headersSize: 90,
        bodySize: 28,
        content: "username=bob&password=secret",
      },
    });
  });

  it("REQ: no content when the request has no post data", () => {
    const get = { ...entry, request: { ...entry.request, postData: undefined } };
    expect(getTabData(get, "REQ").data).toMatchObject({ content: undefined });
  });

  it("RES: response headers, sizes and body text", () => {
    expect(getTabData(entry, "RES")).toEqual({
      tab: "RES",
      data: {
        headers: [{ name: "Content-Type", value: "application/json" }],
        headersSize: 80,
        bodySize: 42,
        content: '{"ok":true}',
      },
    });
  });

  it("RES: no content when the body text was not saved", () => {
    const noText = {
      ...entry,
      response: { ...entry.response, content: { size: 42, mimeType: "application/json" } },
    };
    expect(getTabData(noText, "RES").data).toMatchObject({ content: undefined });
  });

  it("COO: request and response cookies", () => {
    expect(getTabData(entry, "COO")).toEqual({
      tab: "COO",
      data: {
        request: [{ name: "session", value: "abc123", path: "/", httpOnly: true }],
        response: [{ name: "theme", value: "dark", path: "/" }],
      },
    });
  });

  it("TIM: timings and total time", () => {
    expect(getTabData(entry, "TIM")).toEqual({
      tab: "TIM",
      data: {
        timings: { blocked: 5, dns: 10, connect: 15, ssl: 5, send: 5, wait: 50, receive: 10 },
        totalTime: 100,
      },
    });
  });
});
