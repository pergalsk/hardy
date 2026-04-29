import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import type { ReactElement } from "react";
import { userAgentParseFormatter } from "./index";

const chromeUserAgent =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

const sampleHeader = { name: "User-Agent", value: chromeUserAgent };

describe("userAgentParseFormatter", () => {
  it("has correct id and title", () => {
    expect(userAgentParseFormatter.id).toBe("user-agent-parse-formatter");
    expect(userAgentParseFormatter.title).toBe("Parse");
  });

  it("renders browser badge for a known user agent", () => {
    const element = userAgentParseFormatter.format(sampleHeader);
    const { container } = render(element as ReactElement);
    expect(container).toHaveTextContent("Browser");
    expect(container).toHaveTextContent("Chrome");
  });

  it("renders OS badge for a known user agent", () => {
    const element = userAgentParseFormatter.format(sampleHeader);
    const { container } = render(element as ReactElement);
    expect(container).toHaveTextContent("OS");
    expect(container).toHaveTextContent("Windows");
  });

  it("renders without crashing for empty user agent value", () => {
    const element = userAgentParseFormatter.format({
      name: "User-Agent",
      value: "",
    });
    const { container } = render(element as ReactElement);
    expect(container.firstChild).toBeTruthy();
  });
});
