import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { TextContent } from "./text-content";

describe("TextContent", () => {
  it("renders the data string", () => {
    render(<TextContent data="Hello world" />);
    expect(screen.getByText("Hello world")).toBeInTheDocument();
  });

  it("renders inside a span", () => {
    render(<TextContent data="test" />);
    expect(screen.getByText("test").tagName).toBe("SPAN");
  });

  it("applies text-sm class", () => {
    render(<TextContent data="test" />);
    expect(screen.getByText("test")).toHaveClass("text-sm");
  });
});
