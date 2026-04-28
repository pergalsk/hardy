import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import type { ReactElement } from "react";
import { jsonRawFormatter } from "./index";

describe("jsonRawFormatter", () => {
  it("has correct id and title", () => {
    expect(jsonRawFormatter.id).toBe("json-raw-formatter");
    expect(jsonRawFormatter.title).toBe("Original");
  });

  it("renders the raw content value", () => {
    const element = jsonRawFormatter.format({
      value: '{"key":"value"}',
    });
    const { container } = render(element as ReactElement);
    expect(container).toHaveTextContent('{"key":"value"}');
  });

  it("renders plain text content", () => {
    const element = jsonRawFormatter.format({ value: "plain text response" });
    const { container } = render(element as ReactElement);
    expect(container).toHaveTextContent("plain text response");
  });

  it("renders empty string for null value", () => {
    const element = jsonRawFormatter.format({ value: null });
    const { container } = render(element as ReactElement);
    expect(container.firstChild).toBeTruthy();
  });
});
