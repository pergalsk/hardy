import { describe, it, expect } from "vitest";
import { markVisible } from "./filter";

const makeFilter = (fields = {}) => ({
  url: "",
  method: "",
  status: "",
  ...fields,
});

const makeItem = (overrides = {}) => ({
  url: "https://example.com/api/users",
  method: "GET",
  status: "200",
  ...overrides,
});

describe("markVisible", () => {
  it("marks all items visible when filter fields are empty", () => {
    const mark = markVisible(makeFilter());
    const result = mark(makeItem());
    expect(result.$$visible).toBe(true);
    expect(result.$$hidden).toBe(false);
  });

  it("marks item visible when it matches the filter", () => {
    const mark = markVisible(makeFilter({ url: "users" }));
    expect(mark(makeItem()).$$visible).toBe(true);
  });

  it("marks item hidden when it does not match the filter", () => {
    const mark = markVisible(makeFilter({ url: "posts" }));
    expect(mark(makeItem()).$$visible).toBe(false);
    expect(mark(makeItem()).$$hidden).toBe(true);
  });

  it("supports negative token (prefixed with -)", () => {
    const mark = markVisible(makeFilter({ url: "-posts" }));
    expect(mark(makeItem()).$$visible).toBe(true);
    expect(mark(makeItem({ url: "https://example.com/posts" })).$$visible).toBe(false);
  });

  it("supports multiple tokens in one field (AND logic)", () => {
    const mark = markVisible(makeFilter({ url: "example users" }));
    expect(mark(makeItem()).$$visible).toBe(true);
    expect(mark(makeItem({ url: "https://other.com/users" })).$$visible).toBe(false);
  });

  it("matches across multiple fields simultaneously", () => {
    const mark = markVisible(makeFilter({ url: "users", method: "GET" }));
    expect(mark(makeItem()).$$visible).toBe(true);
    expect(mark(makeItem({ method: "POST" })).$$visible).toBe(false);
  });

  it("is case-insensitive for both token and field value", () => {
    const mark = markVisible(makeFilter({ url: "USERS" }));
    expect(mark(makeItem({ url: "https://example.com/api/users" })).$$visible).toBe(true);
    const markLower = markVisible(makeFilter({ url: "users" }));
    expect(markLower(makeItem({ url: "https://example.com/api/USERS" })).$$visible).toBe(true);
  });

  it("treats a lone '-' token as a positive match (not a negative)", () => {
    // token.length > 1 guard — a bare '-' should not exclude items
    const mark = markVisible(makeFilter({ url: "-" }));
    expect(mark(makeItem({ url: "https://example.com" })).$$visible).toBe(false);
    expect(mark(makeItem({ url: "some-hyphen-url" })).$$visible).toBe(true);
  });

  it("handles numeric field values (e.g. status as number)", () => {
    const mark = markVisible(makeFilter({ status: "200" }));
    expect(mark(makeItem({ status: 200 })).$$visible).toBe(true);
    expect(mark(makeItem({ status: 404 })).$$visible).toBe(false);
  });

  it("marks item visible when a negative token is combined with a matching positive token", () => {
    const mark = markVisible(makeFilter({ url: "example -posts" }));
    expect(mark(makeItem({ url: "https://example.com/api/users" })).$$visible).toBe(true);
    expect(mark(makeItem({ url: "https://example.com/api/posts" })).$$visible).toBe(false);
  });

  it("marks item visible for undefined field value against negative token", () => {
    const mark = markVisible(makeFilter({ url: "-missing" }));
    expect(mark(makeItem({ url: undefined })).$$visible).toBe(true);
  });

  it("preserves all other fields on the returned ListItem", () => {
    const item = makeItem({ $$id: 7, $$visible: false, $$hidden: false, startedDateTime: "t", time: 99, pageref: "p1", statusText: "OK" });
    const result = markVisible(makeFilter())(item);
    expect(result.$$id).toBe(7);
    expect(result.startedDateTime).toBe("t");
    expect(result.time).toBe(99);
  });
});
