import { describe, it, expect } from "vitest";
import type { Formatter } from "./Formatter";

describe("Formatter – type shape and field validation", () => {
  it("accepts a fully constructed formatter object", () => {
    const formatter: Formatter<string> = {
      id: "plain",
      title: "Plain Text",
      icon: "mdi:text",
      tooltip: "Display as plain text",
      format: (data) => data,
    };

    expect(formatter.id).toBe("plain");
    expect(formatter.title).toBe("Plain Text");
    expect(formatter.icon).toBe("mdi:text");
    expect(formatter.tooltip).toBe("Display as plain text");
  });

  it("format function returns the data it receives", () => {
    const formatter: Formatter<string> = {
      id: "echo",
      title: "Echo",
      icon: "mdi:echo",
      tooltip: "",
      format: (data) => data,
    };

    expect(formatter.format("hello")).toBe("hello");
  });

  it("format function can return null", () => {
    const formatter: Formatter<string> = {
      id: "null-fmt",
      title: "Null",
      icon: "",
      tooltip: "",
      format: () => null,
    };

    expect(formatter.format("anything")).toBeNull();
  });

  it("works with a numeric data type", () => {
    const formatter: Formatter<number> = {
      id: "num",
      title: "Number",
      icon: "mdi:number",
      tooltip: "Formats numbers",
      format: (n) => String(n),
    };

    expect(formatter.format(42)).toBe("42");
  });
});
