import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Code } from "./code";

describe("Code", () => {
  it("renders children inside a code element", () => {
    render(<Code>const x = 1;</Code>);
    expect(screen.getByText("const x = 1;").tagName).toBe("CODE");
  });

  it("applies className", () => {
    render(<Code className="highlight">snippet</Code>);
    expect(screen.getByText("snippet")).toHaveClass("highlight");
  });
});
