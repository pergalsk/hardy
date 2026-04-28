import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ActionText } from "./action-text";

describe("ActionText", () => {
  it("renders children", () => {
    render(<ActionText>Filter</ActionText>);
    expect(screen.getByText("Filter")).toBeInTheDocument();
  });

  it("renders inside a span", () => {
    render(<ActionText>Label</ActionText>);
    expect(screen.getByText("Label").tagName).toBe("SPAN");
  });

  it("applies text-sm class", () => {
    render(<ActionText>Label</ActionText>);
    expect(screen.getByText("Label")).toHaveClass("text-sm");
  });
});
