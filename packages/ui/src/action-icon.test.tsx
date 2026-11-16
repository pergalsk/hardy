import type React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { ActionIcon } from "./action-icon";
import { TooltipProvider } from "./tooltip";

const renderIcon = (ui: React.ReactElement) =>
  render(ui, { wrapper: TooltipProvider });

describe("ActionIcon", () => {
  it("renders a button with the label as accessible name", () => {
    renderIcon(<ActionIcon label="Search" />);
    expect(screen.getByRole("button", { name: "Search" })).toBeInTheDocument();
  });

  it("applies active state classes when active=true", () => {
    renderIcon(<ActionIcon label="x" active />);
    expect(screen.getByRole("button")).toHaveClass("text-accent-300");
  });

  it("applies inactive state classes when active=false", () => {
    renderIcon(<ActionIcon label="x" active={false} />);
    expect(screen.getByRole("button")).toHaveClass("text-slate-300");
  });

  it("marks the button aria-disabled (still focusable) when disabled=true", () => {
    renderIcon(<ActionIcon label="x" disabled />);
    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("aria-disabled", "true");
    expect(button).not.toBeDisabled();
    expect(button).toHaveClass("opacity-50");
  });

  it("has no hover highlight when disabled", () => {
    renderIcon(<ActionIcon label="x" disabled />);
    expect(screen.getByRole("button").className).not.toMatch(/hover:/);
  });

  it("calls onClick when clicked", () => {
    const onClick = vi.fn();
    renderIcon(<ActionIcon label="x" onClick={onClick} />);
    fireEvent.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("does not call onClick when disabled", () => {
    const onClick = vi.fn();
    renderIcon(<ActionIcon label="x" onClick={onClick} disabled />);
    fireEvent.click(screen.getByRole("button"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("includes icon class when icon prop is set", () => {
    renderIcon(<ActionIcon label="x" icon="mdi:home" />);
    expect(screen.getByRole("button")).toHaveClass("mdi:home");
  });

  it("shows the label and shortcut in a tooltip on keyboard focus", async () => {
    renderIcon(<ActionIcon label="Search" shortcut="Ctrl+K" />);
    fireEvent.focus(screen.getByRole("button"));
    const tooltip = await screen.findByRole("tooltip");
    expect(tooltip).toHaveTextContent("Search");
    expect(tooltip).toHaveTextContent("Ctrl+K");
  });

  it("shows the tooltip on a disabled icon", async () => {
    renderIcon(<ActionIcon label="Export HAR" disabled />);
    fireEvent.focus(screen.getByRole("button"));
    expect(await screen.findByRole("tooltip")).toHaveTextContent("Export HAR");
  });
});
