import { render, screen } from "@testing-library/react";
import { SEARCH_SECTIONS, searchSectionSelector } from "../../search/sections";
import { CooTab } from "./CooTab";

const section = (container: HTMLElement, name: keyof typeof SEARCH_SECTIONS) =>
  container.querySelector(searchSectionSelector(SEARCH_SECTIONS[name]));

describe("CooTab", () => {
  it("lists request and response cookies in their search sections", () => {
    const { container } = render(
      <CooTab
        data={{
          request: [{ name: "session", value: "abc123" }],
          response: [{ name: "theme", value: "dark" }],
        }}
      />,
    );
    expect(section(container, "reqCookie")).toHaveTextContent("session");
    expect(section(container, "resCookie")).toHaveTextContent("theme");
  });

  it("says when there are no cookies", () => {
    render(<CooTab data={{ request: [], response: [] }} />);
    expect(screen.getAllByText("No data")).toHaveLength(2);
  });
});
