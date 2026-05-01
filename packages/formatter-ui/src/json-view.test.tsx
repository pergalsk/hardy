import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { HostProvider } from "@repo/formatter-core";
import { JsonView } from "./json-view";
import type { HostContext } from "@repo/formatter-core";

const defaultContext: HostContext = {
  theme: "light",
  jsonViewer: {
    collapsed: 1,
    indentWidth: 2,
    enableClipboard: true,
    displayDataTypes: false,
    displayObjectSize: false,
    highlightUpdates: false,
    shortenTextAfterLength: 0,
  },
  notify: vi.fn(),
};

function renderWithHost(ui: React.ReactElement, ctx: HostContext = defaultContext) {
  return render(<HostProvider value={ctx}>{ui}</HostProvider>);
}

describe("JsonView", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders without crashing", () => {
    const { container } = renderWithHost(<JsonView data={{ key: "value" }} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("renders the outer wrapper div", () => {
    const { container } = renderWithHost(<JsonView data={{ a: 1 }} />);
    expect(container.querySelector(".group")).toBeInTheDocument();
  });

  it("renders collapse and expand buttons by default", () => {
    const { container } = renderWithHost(<JsonView data={{ a: 1 }} />);
    expect(container.querySelector(".material-symbols--expand-all-rounded")).toBeInTheDocument();
    expect(container.querySelector(".material-symbols--collapse-all-rounded")).toBeInTheDocument();
  });

  it("does not render collapse/expand buttons when collapseBtns is false", () => {
    const { container } = renderWithHost(<JsonView data={{ a: 1 }} collapseBtns={false} />);
    expect(container.querySelector(".material-symbols--expand-all-rounded")).not.toBeInTheDocument();
    expect(container.querySelector(".material-symbols--collapse-all-rounded")).not.toBeInTheDocument();
  });

  it("renders the clipboard button", () => {
    const { container } = renderWithHost(<JsonView data={{ a: 1 }} />);
    expect(container.querySelector(".material-symbols--content-copy-outline-rounded")).toBeInTheDocument();
  });

  it("calls clipboard API on copy button click", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", {
      value: { writeText },
      writable: true,
      configurable: true,
    });
    const notify = vi.fn();
    const ctx = { ...defaultContext, notify };

    const { container } = renderWithHost(<JsonView data={{ foo: "bar" }} />, ctx);
    const copyBtn = container.querySelector(".material-symbols--content-copy-outline-rounded") as HTMLElement;
    fireEvent.click(copyBtn);

    await vi.waitFor(() => {
      expect(writeText).toHaveBeenCalledWith('{\n  "foo": "bar"\n}');
    });
  });

  it("throws when rendered outside HostProvider", () => {
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    expect(() => render(<JsonView data={{}} />)).toThrow(
      "useFormatterHost must be used inside <HostProvider>",
    );
    consoleSpy.mockRestore();
  });
});
