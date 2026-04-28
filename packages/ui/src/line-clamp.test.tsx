import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { LineClamp } from "./line-clamp";

describe("LineClamp", () => {
  it("renders children when active=false without wrapper", () => {
    render(<LineClamp active={false}><span>Content</span></LineClamp>);
    expect(screen.getByText("Content")).toBeInTheDocument();
  });

  it("renders children when active=true", () => {
    render(<LineClamp active><span>Content</span></LineClamp>);
    expect(screen.getByText("Content")).toBeInTheDocument();
  });

  it("renders children with default active prop", () => {
    render(<LineClamp><span>Default active</span></LineClamp>);
    expect(screen.getByText("Default active")).toBeInTheDocument();
  });

  it("applies line-clamp-3 class by default", () => {
    const { container } = render(<LineClamp><span>Text</span></LineClamp>);
    expect(container.querySelector(".line-clamp-3")).toBeInTheDocument();
  });

  it("applies custom lines class", () => {
    const { container } = render(<LineClamp lines={5}><span>Text</span></LineClamp>);
    expect(container.querySelector(".line-clamp-5")).toBeInTheDocument();
  });
});
