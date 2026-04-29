import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import type { ReactElement } from "react";
import { HostProvider } from "@repo/formatter-core";
import { jsonPrettyFormatter } from "./index";

const hostValue = {
  theme: "light" as const,
  jsonViewer: {
    collapsed: 2,
    indentWidth: 2,
    enableClipboard: true,
    displayDataTypes: false,
    displayObjectSize: false,
    highlightUpdates: false,
    shortenTextAfterLength: 0,
  },
  notify: () => {},
};

describe("jsonPrettyFormatter", () => {
  it("has correct id and title", () => {
    expect(jsonPrettyFormatter.id).toBe("json-pretty-formatter");
    expect(jsonPrettyFormatter.title).toBe("Pretty");
  });

  it("renders plain text content for non-JSON value", () => {
    const element = jsonPrettyFormatter.format({ value: "plain text content" });
    const { container } = render(element as ReactElement);
    expect(container).toHaveTextContent("plain text content");
  });

  it("renders null value as empty string", () => {
    const element = jsonPrettyFormatter.format({ value: null });
    const { container } = render(element as ReactElement);
    expect(container.firstChild).toBeTruthy();
  });

  it("renders valid JSON inside HostProvider", () => {
    const json = JSON.stringify({ status: "ok", count: 42 });
    const element = jsonPrettyFormatter.format({ value: json });
    const { container } = render(
      <HostProvider value={hostValue}>{element}</HostProvider>,
    );
    expect(container.firstChild).toBeTruthy();
  });
});
