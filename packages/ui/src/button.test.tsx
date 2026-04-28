import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Button from "./button";

describe("Button", () => {
  it("renders children", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole("button", { name: "Click me" })).toBeInTheDocument();
  });

  it("applies default variant secondary", () => {
    render(<Button>Text</Button>);
    expect(screen.getByRole("button")).toHaveClass("bg-mirage-50");
  });

  it("applies primary variant classes", () => {
    render(<Button variant="primary">Text</Button>);
    expect(screen.getByRole("button")).toHaveClass("bg-accent-700");
  });

  it("applies ghost variant classes", () => {
    render(<Button variant="ghost">Text</Button>);
    expect(screen.getByRole("button")).toHaveClass("bg-transparent");
  });

  it("applies flat variant classes", () => {
    render(<Button variant="flat">Text</Button>);
    expect(screen.getByRole("button")).toHaveClass("bg-transparent", "text-black");
  });

  it("applies size sm classes", () => {
    render(<Button size="sm">Text</Button>);
    expect(screen.getByRole("button")).toHaveClass("text-sm");
  });

  it("applies size lg classes", () => {
    render(<Button size="lg">Text</Button>);
    expect(screen.getByRole("button")).toHaveClass("text-lg");
  });

  it("is disabled when disabled prop is set", () => {
    render(<Button disabled>Text</Button>);
    expect(screen.getByRole("button")).toBeDisabled();
    expect(screen.getByRole("button")).toHaveClass("opacity-60");
  });

  it("renders icon-only with aria-label", () => {
    render(<Button iconOnly icon="mdi:check" ariaLabel="Confirm" />);
    expect(screen.getByRole("button", { name: "Confirm" })).toBeInTheDocument();
  });

  it("renders icon on the right when iconRight is true", () => {
    const { container } = render(<Button icon="mdi:check" iconRight>Text</Button>);
    const spans = container.querySelectorAll("span.iconify");
    expect(spans.length).toBe(1);
  });
});
