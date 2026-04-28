import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { InfoBadge } from "./info-badge";

describe("InfoBadge", () => {
  it("renders title and value", () => {
    render(<InfoBadge title="Status" value="Active" />);
    expect(screen.getByText("Status")).toBeInTheDocument();
    expect(screen.getByText("Active")).toBeInTheDocument();
  });

  it("shows N/A when value is not provided", () => {
    render(<InfoBadge title="Status" />);
    expect(screen.getByText("N/A")).toBeInTheDocument();
  });

  it("shows N/A when value is null", () => {
    render(<InfoBadge title="Status" value={null} />);
    expect(screen.getByText("N/A")).toBeInTheDocument();
  });

  it("applies green style by default", () => {
    const { container } = render(<InfoBadge title="Label" value="Val" />);
    expect(container.firstChild).toBeInTheDocument();
    const titleDiv = screen.getByText("Label");
    expect(titleDiv).toHaveClass("bg-green-400");
  });

  it("applies yellow style", () => {
    render(<InfoBadge title="Label" value="Val" style="yellow" />);
    expect(screen.getByText("Label")).toHaveClass("bg-yellow-400");
  });

  it("applies violet style", () => {
    render(<InfoBadge title="Label" value="Val" style="violet" />);
    expect(screen.getByText("Label")).toHaveClass("bg-violet-400");
  });
});
