import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import ToggleSwitch from "./toggle-switch";

describe("ToggleSwitch", () => {
  it("renders with role switch", () => {
    render(<ToggleSwitch checked={false} onChange={() => {}} />);
    expect(screen.getByRole("switch")).toBeInTheDocument();
  });

  it("aria-checked reflects checked=true", () => {
    render(<ToggleSwitch checked={true} onChange={() => {}} />);
    expect(screen.getByRole("switch")).toHaveAttribute("aria-checked", "true");
  });

  it("aria-checked reflects checked=false", () => {
    render(<ToggleSwitch checked={false} onChange={() => {}} />);
    expect(screen.getByRole("switch")).toHaveAttribute("aria-checked", "false");
  });

  it("calls onChange with toggled value when clicked", () => {
    const onChange = vi.fn();
    render(<ToggleSwitch checked={false} onChange={onChange} />);
    fireEvent.click(screen.getByRole("switch"));
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it("does not call onChange when disabled", () => {
    const onChange = vi.fn();
    render(<ToggleSwitch checked={false} onChange={onChange} disabled />);
    fireEvent.click(screen.getByRole("switch"));
    expect(onChange).not.toHaveBeenCalled();
  });

  it("is disabled when disabled prop is set", () => {
    render(<ToggleSwitch checked={false} onChange={() => {}} disabled />);
    expect(screen.getByRole("switch")).toBeDisabled();
  });

  it("applies aria-label", () => {
    render(<ToggleSwitch checked={false} onChange={() => {}} ariaLabel="Toggle feature" />);
    expect(screen.getByRole("switch", { name: "Toggle feature" })).toBeInTheDocument();
  });

  it("applies normal size classes by default", () => {
    render(<ToggleSwitch checked={false} onChange={() => {}} />);
    expect(screen.getByRole("switch")).toHaveClass("h-6", "w-11");
  });

  it("applies small size classes when size=small", () => {
    render(<ToggleSwitch checked={false} onChange={() => {}} size="small" />);
    expect(screen.getByRole("switch")).toHaveClass("h-5", "w-9");
  });

  it("knob has translate-x-6 when checked and normal size", () => {
    const { container } = render(<ToggleSwitch checked={true} onChange={() => {}} />);
    expect(container.querySelector("span")).toHaveClass("translate-x-6");
  });

  it("knob has translate-x-1 when unchecked", () => {
    const { container } = render(<ToggleSwitch checked={false} onChange={() => {}} />);
    expect(container.querySelector("span")).toHaveClass("translate-x-1");
  });
});
