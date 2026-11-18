import { render, screen, fireEvent } from "@testing-library/react";
import type { Har } from "@repo/har-types";
import { useAppStore } from "../../../store/store";
import { mockHarEntry } from "../../../../src/test-fixtures";
import { Detail } from "./Detail";

// Response with no body/content-type so no JSON formatter is invoked
// (the JSON formatter needs HostProvider which is not provided in unit tests)
const entry = {
  ...mockHarEntry,
  response: {
    ...mockHarEntry.response,
    headers: [],
    content: { size: 0, mimeType: "text/plain", text: "" },
  },
};

beforeEach(() => {
  useAppStore.setState({
    files: [
      {
        fileId: "f1",
        name: "test.har",
        size: 0,
        data: { log: { entries: [entry], pages: [] } } as unknown as Har,
      },
    ],
    ui: { fileId: "f1", rowId: 0, pinnedIds: new Set(), showPinnedOnly: false, tab: "REQ" },
  });
});

const sectionNames = (container: HTMLElement) =>
  Array.from(container.querySelectorAll("[data-search-section]")).map((el) =>
    el.getAttribute("data-search-section"),
  );

describe("Detail — tab content", () => {
  it.each([
    ["Request", ["url", "reqHeader", "reqBody"]],
    ["Response", ["url", "resHeader", "resBody"]],
    ["Cookies", ["url", "reqCookie", "resCookie"]],
    ["Timing", ["url"]],
  ])("%s tab shows its search sections", (name, sections) => {
    const { container } = render(<Detail />);
    fireEvent.click(screen.getByRole("button", { name: new RegExp(name, "i") }));
    expect(sectionNames(container)).toEqual(sections);
  });

  it("renders no sections when the selected row has no entry", () => {
    useAppStore.setState({ ui: { ...useAppStore.getState().ui, rowId: 99 } });
    const { container } = render(<Detail />);
    expect(sectionNames(container)).toEqual([]);
  });
});

describe("Detail — tab switching", () => {
  it("shows the Request tab content by default", () => {
    render(<Detail />);
    expect(useAppStore.getState().ui.tab).toBe("REQ");
    expect(screen.getByRole("button", { name: /request/i })).toBeInTheDocument();
  });

  it("clicking the Response tab switches to RES", () => {
    render(<Detail />);
    fireEvent.click(screen.getByRole("button", { name: /response/i }));
    expect(useAppStore.getState().ui.tab).toBe("RES");
  });

  it("clicking the Cookies tab switches to COO", () => {
    render(<Detail />);
    fireEvent.click(screen.getByRole("button", { name: /cookies/i }));
    expect(useAppStore.getState().ui.tab).toBe("COO");
  });

  it("clicking the Timing tab switches to TIM", () => {
    render(<Detail />);
    fireEvent.click(screen.getByRole("button", { name: /timing/i }));
    expect(useAppStore.getState().ui.tab).toBe("TIM");
  });

  it("clicking Request tab after switching returns to REQ", () => {
    render(<Detail />);
    fireEvent.click(screen.getByRole("button", { name: /response/i }));
    fireEvent.click(screen.getByRole("button", { name: /request/i }));
    expect(useAppStore.getState().ui.tab).toBe("REQ");
  });
});
