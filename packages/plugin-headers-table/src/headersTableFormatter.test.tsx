import { describe, it, expect, vi } from "vitest";
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

  it("does not change the order of the input array", () => {
    const headers = [
      { name: "Content-Type", value: "application/json" },
      { name: "Accept", value: "text/html" },
    ];
    const element = headersTableFormatter.format(headers);
    render(element as ReactElement);
    expect(headers.map((h) => h.name)).toEqual(["Content-Type", "Accept"]);
  });

  it("renders repeated header names without key warnings", () => {
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    const headers = [
      { name: "Set-Cookie", value: "a=1" },
      { name: "Set-Cookie", value: "b=2" },
    ];
    const element = headersTableFormatter.format(headers);
    const { container } = render(element as ReactElement);
    expect(container.querySelectorAll("tr")).toHaveLength(2);
    expect(container).toHaveTextContent("a=1");
    expect(container).toHaveTextContent("b=2");
    expect(errorSpy).not.toHaveBeenCalled();
    errorSpy.mockRestore();
  });

  it("renders no-content message for empty headers", () => {
    const element = headersTableFormatter.format([]);
    const { container } = render(element as ReactElement);
    expect(container).toHaveTextContent("No Content");
  });
});
