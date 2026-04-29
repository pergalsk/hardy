import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { HostProvider } from "@repo/formatter-core";
import { headersRawFormatter } from "./index";

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

const sampleHeaders = [{ name: "Content-Type", value: "application/json" }];

describe("headersRawFormatter", () => {
  it("has correct id and title", () => {
    expect(headersRawFormatter.id).toBe("headers-raw-formatter");
    expect(headersRawFormatter.title).toBe("Raw");
  });

  it("renders inside HostProvider without crashing", () => {
    const element = headersRawFormatter.format(sampleHeaders);
    const { container } = render(
      <HostProvider value={hostValue}>{element}</HostProvider>,
    );
    expect(container.firstChild).toBeTruthy();
  });

  it("renders multiple headers inside HostProvider", () => {
    const headers = [
      { name: "Content-Type", value: "application/json" },
      { name: "Authorization", value: "Bearer token123" },
    ];
    const element = headersRawFormatter.format(headers);
    const { container } = render(
      <HostProvider value={hostValue}>{element}</HostProvider>,
    );
    expect(container.firstChild).toBeTruthy();
  });
});
