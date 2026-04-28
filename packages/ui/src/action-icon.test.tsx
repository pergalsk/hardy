import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { ActionIcon } from "./action-icon";

describe("ActionIcon", () => {
  it("renders a button role element", () => {
    render(<ActionIcon />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("applies active state classes when active=true", () => {
    render(<ActionIcon active />);
    expect(screen.getByRole("button")).toHaveClass("text-accent-300");
  });

  it("applies inactive state classes when active=false", () => {
    render(<ActionIcon active={false} />);
    expect(screen.getByRole("button")).toHaveClass("text-slate-300");
  });

  it("applies disabled classes when disabled=true", () => {
    render(<ActionIcon disabled />);
    expect(screen.getByRole("button")).toHaveClass("opacity-50", "pointer-events-none");
  });

  it("calls onClick when clicked", () => {
    const onClick = vi.fn();
    render(<ActionIcon onClick={onClick} />);
    fireEvent.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("does not call onClick when disabled", () => {
    const onClick = vi.fn();
    render(<ActionIcon onClick={onClick} disabled />);
    fireEvent.click(screen.getByRole("button"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("includes icon class when icon prop is set", () => {
    render(<ActionIcon icon="mdi:home" />);
    expect(screen.getByRole("button")).toHaveClass("mdi:home");
  });
});
