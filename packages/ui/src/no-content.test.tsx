import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { NoContent } from "./no-content";

describe("NoContent", () => {
  it("renders default message when no children", () => {
    render(<NoContent />);
    expect(screen.getByText("No content here")).toBeInTheDocument();
  });

  it("renders custom children", () => {
    render(<NoContent>Nothing found</NoContent>);
    expect(screen.getByText("Nothing found")).toBeInTheDocument();
  });

  it("renders icon when showIcon is true", () => {
    const { container } = render(<NoContent showIcon />);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("does not render icon by default", () => {
    const { container } = render(<NoContent />);
    expect(container.querySelector("svg")).not.toBeInTheDocument();
  });
});
