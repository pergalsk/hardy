import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Card } from "./card";

describe("Card", () => {
  it("renders title and children", () => {
    render(<Card title="My Card" href="/docs">Description text</Card>);
    expect(screen.getByText(/My Card/)).toBeInTheDocument();
    expect(screen.getByText("Description text")).toBeInTheDocument();
  });

  it("renders as a link with href", () => {
    render(<Card title="Card" href="/about">Content</Card>);
    const link = screen.getByRole("link");
    expect(link.getAttribute("href")).toContain("/about");
  });

  it("opens in a new tab", () => {
    render(<Card title="Card" href="/about">Content</Card>);
    expect(screen.getByRole("link")).toHaveAttribute("target", "_blank");
  });

  it("applies custom className", () => {
    render(<Card title="Card" href="/" className="custom-class">Content</Card>);
    expect(screen.getByRole("link")).toHaveClass("custom-class");
  });
});
