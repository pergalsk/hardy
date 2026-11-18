import { describe, it, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import type { ReactElement } from "react";
import { headersPlainFormatter } from "./index";

const sampleHeaders = [
  { name: "Content-Type", value: "application/json" },
  { name: "Accept", value: "text/html" },
];

describe("headersPlainFormatter", () => {
  it("has correct id and title", () => {
    expect(headersPlainFormatter.id).toBe("headers-plain-formatter");
    expect(headersPlainFormatter.title).toBe("Plain");
  });

  it("renders header names and values", () => {
    const element = headersPlainFormatter.format(sampleHeaders);
    const { container } = render(element as ReactElement);
    expect(container).toHaveTextContent("Content-Type");
    expect(container).toHaveTextContent("application/json");
  });

  it("renders all provided headers", () => {
    const element = headersPlainFormatter.format(sampleHeaders);
    const { container } = render(element as ReactElement);
    expect(container).toHaveTextContent("Accept");
    expect(container).toHaveTextContent("text/html");
  });

  it("renders repeated header names without key warnings", () => {
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    const headers = [
      { name: "Set-Cookie", value: "a=1" },
      { name: "Set-Cookie", value: "b=2" },
    ];
    const element = headersPlainFormatter.format(headers);
    const { container } = render(element as ReactElement);
    expect(container).toHaveTextContent("Set-Cookie: a=1");
    expect(container).toHaveTextContent("Set-Cookie: b=2");
    expect(errorSpy).not.toHaveBeenCalled();
    errorSpy.mockRestore();
  });

  it("renders empty header list without crashing", () => {
    const element = headersPlainFormatter.format([]);
    const { container } = render(element as ReactElement);
    expect(container.firstChild).toBeTruthy();
  });
});
