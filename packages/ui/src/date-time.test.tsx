import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { DateTime } from "./date-time";

describe("DateTime", () => {
  it("renders value when provided", () => {
    render(<DateTime value="2024-01-15" />);
    expect(screen.getByText("2024-01-15")).toBeInTheDocument();
  });

  it("renders nothing when value is empty string", () => {
    const { container } = render(<DateTime value="" />);
    expect(container.firstChild).toBeNull();
  });

  it("applies ml-auto class", () => {
    render(<DateTime value="2024-01-15" />);
    expect(screen.getByText("2024-01-15")).toHaveClass("ml-auto");
  });
});
