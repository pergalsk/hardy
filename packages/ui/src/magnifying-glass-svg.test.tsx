import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { MagnifyingGlassSvg } from "./magnifying-glass-svg";

describe("MagnifyingGlassSvg", () => {
  it("renders an svg element", () => {
    const { container } = render(<MagnifyingGlassSvg />);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("renders with correct dimensions", () => {
    const { container } = render(<MagnifyingGlassSvg />);
    const svg = container.querySelector("svg");
    expect(svg).toHaveAttribute("width", "128");
    expect(svg).toHaveAttribute("height", "128");
  });
});
