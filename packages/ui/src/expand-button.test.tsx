import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { ExpandButton } from "./expand-button";

describe("ExpandButton", () => {
  it("renders children", () => {
    render(<ExpandButton handleClick={() => {}}>...More</ExpandButton>);
    expect(screen.getByText("...More")).toBeInTheDocument();
  });

  it("calls handleClick when clicked", () => {
    const handleClick = vi.fn();
    render(<ExpandButton handleClick={handleClick}>Click</ExpandButton>);
    fireEvent.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledOnce();
  });

  it("applies inline positioning by default", () => {
    const { container } = render(<ExpandButton handleClick={() => {}}>More</ExpandButton>);
    expect(container.querySelector("button")).toHaveClass("absolute");
  });

  it("applies static positioning when inline=false", () => {
    const { container } = render(<ExpandButton handleClick={() => {}} inline={false}>More</ExpandButton>);
    expect(container.querySelector("button")).toHaveClass("static");
  });

  it("applies custom classes", () => {
    const { container } = render(
      <ExpandButton handleClick={() => {}} classes="bg-red-500">More</ExpandButton>
    );
    expect(container.querySelector("button")).toHaveClass("bg-red-500");
  });
});
