import { describe, it, expect } from "vitest";
import { groupByProperty } from "./groupByProperty";

describe("groupByProperty", () => {
  it("returns an empty array for empty input", () => {
    expect(groupByProperty([], "pageref")).toEqual([]);
  });

  it("groups consecutive items with the same property value", () => {
    const items = [
      { pageref: "page_1", url: "a" },
      { pageref: "page_1", url: "b" },
      { pageref: "page_2", url: "c" },
    ];
    const result = groupByProperty(items, "pageref");
    expect(result).toHaveLength(2);
    expect(result[0]).toHaveLength(2);
    expect(result[1]).toHaveLength(1);
  });

  it("does not group non-consecutive items with the same value", () => {
    const items = [
      { pageref: "page_1", url: "a" },
      { pageref: "page_2", url: "b" },
      { pageref: "page_1", url: "c" },
    ];
    const result = groupByProperty(items, "pageref");
    expect(result).toHaveLength(3);
  });

  it("puts each item in its own group when all values differ", () => {
    const items = [
      { pageref: "a" },
      { pageref: "b" },
      { pageref: "c" },
    ];
    const result = groupByProperty(items, "pageref");
    expect(result).toHaveLength(3);
    result.forEach((group) => expect(group).toHaveLength(1));
  });
});
