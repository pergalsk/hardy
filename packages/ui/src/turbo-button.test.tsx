import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Button } from "./turbo-button";

describe("TurboButton", () => {
  it("renders children", () => {
    render(<Button appName="web">Click me</Button>);
    expect(screen.getByRole("button", { name: "Click me" })).toBeInTheDocument();
  });

  it("applies custom className", () => {
    render(<Button appName="web" className="my-class">Btn</Button>);
    expect(screen.getByRole("button")).toHaveClass("my-class");
  });
});
