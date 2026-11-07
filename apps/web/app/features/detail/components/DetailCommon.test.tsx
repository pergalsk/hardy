import { render } from "@testing-library/react";
import type { Har } from "@repo/har-types";
import { useAppStore } from "../../../store/store";
import { mockHarEntry } from "../../../../src/test-fixtures";
import { DetailCommon } from "./DetailCommon";

beforeEach(() => {
  useAppStore.setState({
    files: [{ fileId: "f1", name: "test.har", size: 0, data: { log: { entries: [mockHarEntry], pages: [] } } as unknown as Har }],
    ui: { fileId: "f1", rowId: 0, pinnedIds: new Set(), showPinnedOnly: false, tab: "REQ" },
  });
});

test("renders without crashing", () => {
  const { container } = render(<DetailCommon />);
  expect(container).not.toBeEmptyDOMElement();
});

const setStatus = (status: number) =>
  useAppStore.setState({
    files: [
      {
        fileId: "f1",
        name: "test.har",
        size: 0,
        data: {
          log: { entries: [{ ...mockHarEntry, response: { ...mockHarEntry.response, status } }], pages: [] },
        } as unknown as Har,
      },
    ],
  });

describe("DetailCommon — error status", () => {
  it.each([400, 404, 502, 599])("uses error colors for status %i", (status) => {
    setStatus(status);
    const { container } = render(<DetailCommon />);
    expect(container.firstChild).toHaveClass("bg-[#ffeded]");
    expect(container.querySelector("hr")).toHaveClass("border-red-200");
  });

  it.each([200, 301, 600])("uses default colors for status %i", (status) => {
    setStatus(status);
    const { container } = render(<DetailCommon />);
    expect(container.firstChild).toHaveClass("bg-mirage-50");
    expect(container.querySelector("hr")).toHaveClass("border-mirage-100");
  });
});
