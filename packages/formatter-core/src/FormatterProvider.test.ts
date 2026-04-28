import { describe, it, expect } from "vitest";
import { FormatterProvider } from "./FormatterProvider";

type Item = { id: string; name: string };

describe("FormatterProvider – registration and retrieval", () => {
  it("returns indexes as a string when a single formatter is added", () => {
    const provider = FormatterProvider<Item>();
    const result = provider.addFormatters("xml", { id: "x1", name: "X1" });
    expect(result).toBe("x1");
  });

  it("returns indexes as an array when multiple formatters are added", () => {
    const provider = FormatterProvider<Item>();
    const result = provider.addFormatters("xml", [
      { id: "x1", name: "X1" },
      { id: "x2", name: "X2" },
    ]);
    expect(result).toEqual(["x1", "x2"]);
  });

  it("overwrites a formatter registered under the same id", () => {
    const provider = FormatterProvider<Item>();
    provider.addFormatters("key", { id: "f1", name: "Old" });
    provider.addFormatters("key", { id: "f1", name: "New" });
    expect(provider.getFormatter("key", "f1")).toEqual({ id: "f1", name: "New" });
  });

  it("getFormatters returns all formatters for a key", () => {
    const provider = FormatterProvider<Item>();
    provider.addFormatters("key", [
      { id: "a", name: "A" },
      { id: "b", name: "B" },
    ]);
    const all = provider.getFormatters("key");
    expect(all).toEqual({
      a: { id: "a", name: "A" },
      b: { id: "b", name: "B" },
    });
  });

  it("getFormatter with empty id returns null", () => {
    const provider = FormatterProvider<Item>();
    provider.addFormatters("key", { id: "f1", name: "F1" });
    expect(provider.getFormatter("key", "")).toBeNull();
  });

  it("uses case-insensitive matching as the default", () => {
    const provider = FormatterProvider<Item>();
    provider.addFormatters("Content-Type", { id: "ct", name: "CT" });
    expect(provider.getFormatters("content-type")).not.toBeNull();
    expect(provider.getFormatters("CONTENT-TYPE")).not.toBeNull();
  });

  it("falls back to null when formatter key is absent", () => {
    const provider = FormatterProvider<Item>();
    expect(provider.getDefaultFormatter("nope")).toBeNull();
  });
});
