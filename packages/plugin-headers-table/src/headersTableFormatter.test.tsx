import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import type { ReactElement } from "react";
import { headersTableFormatter } from "./index";

const sampleHeaders = [
  { name: "Content-Type", value: "application/json" },
  { name: "Accept", value: "text/html" },
];

describe("headersTableFormatter", () => {
  it("has correct id and title", () => {
    expect(headersTableFormatter.id).toBe("headers-table-formatter");
    expect(headersTableFormatter.title).toBe("Table");
  });

  it("renders header names in table cells", () => {
    const element = headersTableFormatter.format(sampleHeaders);
    const { container } = render(element as ReactElement);
    expect(container).toHaveTextContent("Content-Type");
    expect(container).toHaveTextContent("Accept");
  });

  it("renders header values", () => {
    const element = headersTableFormatter.format(sampleHeaders);
    const { container } = render(element as ReactElement);
    expect(container).toHaveTextContent("application/json");
    expect(container).toHaveTextContent("text/html");
  });

  it("renders no-content message for empty headers", () => {
    const element = headersTableFormatter.format([]);
    const { container } = render(element as ReactElement);
    expect(container).toHaveTextContent("No Content");
  });
});
