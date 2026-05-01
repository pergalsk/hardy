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
});
