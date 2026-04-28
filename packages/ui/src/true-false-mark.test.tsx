import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { TrueFalseMark } from "./true-false-mark";

describe("TrueFalseMark", () => {
  it("renders Y when value is true", () => {
    render(<TrueFalseMark value={true} />);
    expect(screen.getByText("Y")).toBeInTheDocument();
  });

  it("renders N when value is false", () => {
    render(<TrueFalseMark value={false} />);
    expect(screen.getByText("N")).toBeInTheDocument();
  });

  it("true span has accent background", () => {
    render(<TrueFalseMark value={true} />);
    expect(screen.getByText("Y")).toHaveClass("bg-accent-50");
  });

  it("false span has slate background", () => {
    render(<TrueFalseMark value={false} />);
    expect(screen.getByText("N")).toHaveClass("bg-slate-100");
  });
});
