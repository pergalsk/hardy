import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ActionBar } from "./action-bar";

describe("ActionBar", () => {
  it("renders children", () => {
    render(<ActionBar><span>Item</span></ActionBar>);
    expect(screen.getByText("Item")).toBeInTheDocument();
  });

  it("applies mr-auto by default", () => {
    const { container } = render(<ActionBar><span>Item</span></ActionBar>);
    expect(container.firstChild).toHaveClass("mr-auto");
  });

  it("applies ml-auto when alignRight is true", () => {
    const { container } = render(<ActionBar alignRight><span>Item</span></ActionBar>);
    expect(container.firstChild).toHaveClass("ml-auto");
  });
});
