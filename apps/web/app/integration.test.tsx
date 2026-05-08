import { render, screen, fireEvent, act, within } from "@testing-library/react";
import { useAppStore } from "./store/store";
import { mockHarEntry } from "../src/test-fixtures";
import { List } from "./features/list/components/List";
import { Detail } from "./features/detail/components/Detail";

// No response body/content-type so the JSON formatter (which needs HostProvider) is not invoked
const noBody = { headers: [], content: { size: 0, mimeType: "text/plain", text: "" } };

const entries = [
  {
    ...mockHarEntry,
    request: { ...mockHarEntry.request, method: "GET", url: "https://example.com/api/alpha" },
    response: { ...mockHarEntry.response, ...noBody, status: 200, statusText: "OK" },
  },
  {
    ...mockHarEntry,
    request: { ...mockHarEntry.request, method: "POST", url: "https://example.com/api/beta" },
    response: { ...mockHarEntry.response, ...noBody, status: 201, statusText: "Created" },
  },
  {
    ...mockHarEntry,
    request: { ...mockHarEntry.request, method: "DELETE", url: "https://example.com/api/gamma" },
    response: { ...mockHarEntry.response, ...noBody, status: 404, statusText: "Not Found" },
  },
];

beforeEach(() => {
  useAppStore.setState({
    files: [{ fileId: "f1", name: "test.har", size: 0, data: { log: { entries, pages: [] } } }],
    ui: { fileId: "f1", rowId: 0, pinnedIds: new Set(), showPinnedOnly: false, tab: "REQ" },
    filter: { visible: false, active: false, count: -1, fields: { url: "", method: "", status: "" } },
    settings: { groupHidden: false, excludeHidden: false, hideEmptyPages: true },
    uiPersistent: { filterActive: false, sortingActive: false, showPages: false, detailFormatterId: null },
  });
});

describe("Integration — load HAR → list → detail", () => {
  it("renders the correct number of list rows from a HAR fixture", () => {
    render(<List />);
    expect(screen.getAllByText(/^#\d+$/).length).toBe(3);
  });

  it("clicking a list row updates the selected rowId in the store", () => {
    render(<List />);
    // The second item's number label is the easiest stable click target
    const secondItem = screen.getByText("#2").closest("div[class]")!;
    fireEvent.click(secondItem);
    expect(useAppStore.getState().ui.rowId).toBe(1);
  });

  it("detail panel shows URL, method, and status labels for the selected entry", () => {
    const { container } = render(
      <div>
        <List />
        <div data-testid="detail">
          <Detail />
        </div>
      </div>,
    );

    act(() => {
      useAppStore.setState((s) => ({ ui: { ...s.ui, rowId: 0 } }));
    });

    const detail = within(container.querySelector("[data-testid='detail']")!);
    expect(detail.getByText("URL:")).toBeInTheDocument();
    expect(detail.getByText("Method:")).toBeInTheDocument();
    expect(detail.getByText("Status:")).toBeInTheDocument();
    expect(detail.getByText("GET")).toBeInTheDocument();
    expect(detail.getByText("200")).toBeInTheDocument();
  });

  it("switching the selected row updates the detail panel", () => {
    const { container } = render(
      <div>
        <List />
        <div data-testid="detail">
          <Detail />
        </div>
      </div>,
    );

    act(() => {
      useAppStore.setState((s) => ({ ui: { ...s.ui, rowId: 1 } }));
    });

    const detail = within(container.querySelector("[data-testid='detail']")!);
    expect(detail.getByText("POST")).toBeInTheDocument();
    expect(detail.getByText("201")).toBeInTheDocument();
  });
});
