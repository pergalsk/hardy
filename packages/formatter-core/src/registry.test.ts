import { describe, it, expect, beforeEach } from "vitest";
import { FormatterProvider } from "./FormatterProvider";

type TestFormatter = { id: string; label: string };

describe("FormatterProvider – registry basics", () => {
  let provider: ReturnType<typeof FormatterProvider<TestFormatter>>;

  beforeEach(() => {
    provider = FormatterProvider<TestFormatter>();
  });

  it("adds a single formatter and retrieves it", () => {
    provider.addFormatters("json", { id: "f1", label: "F1" });
    const result = provider.getFormatter("json", "f1");
    expect(result).toEqual({ id: "f1", label: "F1" });
  });

  it("adds multiple formatters at once", () => {
    provider.addFormatters("json", [
      { id: "f1", label: "F1" },
      { id: "f2", label: "F2" },
    ]);
    expect(provider.getFormatter("json", "f1")).toEqual({ id: "f1", label: "F1" });
    expect(provider.getFormatter("json", "f2")).toEqual({ id: "f2", label: "F2" });
  });

  it("returns null for a key that was never added", () => {
    expect(provider.getFormatters("missing")).toBeNull();
  });

  it("returns null for an id that was never added", () => {
    provider.addFormatters("json", { id: "f1", label: "F1" });
    expect(provider.getFormatter("json", "unknown")).toBeNull();
  });

  it("removes a specific formatter by id", () => {
    provider.addFormatters("json", [
      { id: "f1", label: "F1" },
      { id: "f2", label: "F2" },
    ]);
    provider.removeFormatter("json", "f1");
    expect(provider.getFormatter("json", "f1")).toBeNull();
    expect(provider.getFormatter("json", "f2")).toEqual({ id: "f2", label: "F2" });
  });

  it("removes all formatters for a key when no id given", () => {
    provider.addFormatters("json", { id: "f1", label: "F1" });
    provider.removeFormatter("json");
    expect(provider.getFormatters("json")).toBeNull();
  });

  it("is case-insensitive by default", () => {
    provider.addFormatters("JSON", { id: "f1", label: "F1" });
    expect(provider.getFormatter("json", "f1")).toEqual({ id: "f1", label: "F1" });
    expect(provider.getFormatter("JSON", "f1")).toEqual({ id: "f1", label: "F1" });
    expect(provider.getFormatter("Json", "f1")).toEqual({ id: "f1", label: "F1" });
  });

  it("is case-sensitive when configured", () => {
    const cs = FormatterProvider<TestFormatter>({ comparativeMethod: "case-sensitive" });
    cs.addFormatters("JSON", { id: "f1", label: "F1" });
    expect(cs.getFormatter("JSON", "f1")).toEqual({ id: "f1", label: "F1" });
    expect(cs.getFormatter("json", "f1")).toBeNull();
  });

  it("getDefaultFormatter returns first registered entry", () => {
    provider.addFormatters("json", [
      { id: "f1", label: "F1" },
      { id: "f2", label: "F2" },
    ]);
    const def = provider.getDefaultFormatter("json");
    expect(def).not.toBeNull();
    expect(def![0]).toBe("f1");
    expect(def![1]).toEqual({ id: "f1", label: "F1" });
  });

  it("getDefaultFormatter returns null for unknown key", () => {
    expect(provider.getDefaultFormatter("missing")).toBeNull();
  });
});
