import { render, screen, act } from "@testing-library/react";
import { useAppStore } from "../../../store/store";
import { setFilterFields, clearFilter } from "../actions";
import { mockHarEntry } from "../../../../src/test-fixtures";
import { List } from "./List";

test("renders without crashing", () => {
  const { container } = render(<List />);
  expect(container).not.toBeEmptyDOMElement();
});

const makeEntry = (method: string, url: string, status: number) => ({
  ...mockHarEntry,
  request: { ...mockHarEntry.request, method, url },
  response: { ...mockHarEntry.response, status, statusText: String(status) },
});

const setupStore = () =>
  useAppStore.setState({
    files: [
      {
        fileId: "f1",
        name: "test.har",
        size: 0,
        data: {
          log: {
            entries: [
              makeEntry("GET", "https://api.example.com/users", 200),
              makeEntry("POST", "https://api.example.com/posts", 201),
              makeEntry("DELETE", "https://api.example.com/comments", 404),
            ],
            pages: [],
          },
        },
      },
    ],
    ui: { fileId: "f1", rowId: 0, pinnedIds: new Set(), showPinnedOnly: false, tab: "REQ" },
    filter: { visible: false, active: false, count: -1, fields: { url: "", method: "", status: "" } },
    settings: { groupHidden: false, excludeHidden: true, hideEmptyPages: true },
    uiPersistent: { filterActive: false, sortingActive: false, showPages: false, detailFormatterId: null },
  });

describe("List — filter behavior", () => {
  beforeEach(setupStore);

  afterEach(() => {
    act(() => clearFilter());
  });

  it("renders all rows when no filter is active", () => {
    render(<List />);
    expect(screen.getAllByText(/^#\d+$/).length).toBe(3);
  });

  it("hides non-matching rows when a URL filter is applied", () => {
    render(<List />);
    act(() => setFilterFields({ url: "users", method: "", status: "" }));
    expect(screen.getAllByText(/^#\d+$/).length).toBe(1);
    expect(screen.getByText("#1")).toBeInTheDocument();
  });

  it("restores all rows when the filter is cleared", () => {
    render(<List />);
    act(() => setFilterFields({ url: "users", method: "", status: "" }));
    expect(screen.getAllByText(/^#\d+$/).length).toBe(1);
    act(() => clearFilter());
    expect(screen.getAllByText(/^#\d+$/).length).toBe(3);
  });

  it("filters by HTTP method", () => {
    render(<List />);
    act(() => setFilterFields({ url: "", method: "POST", status: "" }));
    expect(screen.getAllByText(/^#\d+$/).length).toBe(1);
    expect(screen.getByText("#2")).toBeInTheDocument();
  });

  it("filters by HTTP status", () => {
    render(<List />);
    act(() => setFilterFields({ url: "", method: "", status: "404" }));
    expect(screen.getAllByText(/^#\d+$/).length).toBe(1);
    expect(screen.getByText("#3")).toBeInTheDocument();
  });
});
