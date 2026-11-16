import type React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Tooltip, TooltipProvider } from "./tooltip";

const renderTooltip = (ui: React.ReactElement) =>
  render(ui, { wrapper: TooltipProvider });

describe("Tooltip", () => {
  it("is hidden until the trigger gets focus", async () => {
    renderTooltip(
      <Tooltip content="Hint">
        <button type="button">Trigger</button>
      </Tooltip>,
    );
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();

    fireEvent.focus(screen.getByRole("button"));
    expect(await screen.findByRole("tooltip")).toHaveTextContent("Hint");
  });

  it("renders the shortcut as kbd", async () => {
    renderTooltip(
      <Tooltip content="Search" shortcut="Ctrl+K">
        <button type="button">Trigger</button>
      </Tooltip>,
    );
    fireEvent.focus(screen.getByRole("button"));
    await screen.findByRole("tooltip");
    expect(document.querySelector("kbd")).toHaveTextContent("Ctrl+K");
  });

  it("works without a TooltipProvider", async () => {
    render(
      <Tooltip content="Hint">
        <button type="button">Trigger</button>
      </Tooltip>,
    );
    fireEvent.focus(screen.getByRole("button"));
    expect(await screen.findByRole("tooltip")).toHaveTextContent("Hint");
  });

  it("renders inside a native dialog so it is not hidden behind it", async () => {
    renderTooltip(
      <dialog open>
        <Tooltip content="Hint">
          <button type="button">Trigger</button>
        </Tooltip>
      </dialog>,
    );
    fireEvent.focus(screen.getByRole("button"));
    const tooltip = await screen.findByRole("tooltip");
    expect(tooltip.closest("dialog")).not.toBeNull();
  });

  it("closes on Escape", async () => {
    renderTooltip(
      <Tooltip content="Hint">
        <button type="button">Trigger</button>
      </Tooltip>,
    );
    fireEvent.focus(screen.getByRole("button"));
    await screen.findByRole("tooltip");

    fireEvent.keyDown(document, { key: "Escape" });
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
  });
});
