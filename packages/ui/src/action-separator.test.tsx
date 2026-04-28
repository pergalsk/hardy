import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ActionSeparator } from "./action-separator";

describe("ActionSeparator", () => {
  it("renders a line separator by default", () => {
    const { container } = render(<ActionSeparator />);
    expect(container.firstChild).toHaveClass("border-r");
  });

  it("renders a space separator when type=space", () => {
    const { container } = render(<ActionSeparator type="space" />);
    expect(container.firstChild).toHaveClass("mx-auto");
    expect(container.firstChild).not.toHaveClass("border-r");
  });

  it("both variants have aria-hidden", () => {
    const { container: line } = render(<ActionSeparator type="line" />);
    const { container: space } = render(<ActionSeparator type="space" />);
    expect(line.firstChild).toHaveAttribute("aria-hidden");
    expect(space.firstChild).toHaveAttribute("aria-hidden");
  });
});
