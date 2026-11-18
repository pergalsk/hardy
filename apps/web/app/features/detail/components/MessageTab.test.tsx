import { render, screen } from "@testing-library/react";
import { SEARCH_SECTIONS, searchSectionSelector } from "../../search/sections";
import { MessageTab } from "./MessageTab";

const renderTab = (content: string | undefined) =>
  render(
    <MessageTab
      data={{
        headers: [{ name: "Content-Type", value: "text/plain" }],
        headersSize: 90,
        bodySize: 11,
        content,
      }}
      headerSection={SEARCH_SECTIONS.resHeader}
      bodySection={SEARCH_SECTIONS.resBody}
    />,
  );

describe("MessageTab", () => {
  it("marks headers and body with the given search sections", () => {
    const { container } = renderTab("hello world");
    const headers = container.querySelector(searchSectionSelector(SEARCH_SECTIONS.resHeader));
    const body = container.querySelector(searchSectionSelector(SEARCH_SECTIONS.resBody));
    expect(headers).toHaveTextContent("Headers");
    expect(headers).toHaveTextContent("90 B");
    expect(body).toHaveTextContent("Content");
    expect(body).toHaveTextContent("text/plain | 11 B");
  });

  it("shows the body text", () => {
    renderTab("hello world");
    expect(screen.getByText("hello world")).toBeInTheDocument();
  });

  it("says there is no body when content is missing", () => {
    renderTab(undefined);
    expect(screen.getByText("text/plain | No data")).toBeInTheDocument();
    expect(screen.queryByText("hello world")).not.toBeInTheDocument();
  });
});
