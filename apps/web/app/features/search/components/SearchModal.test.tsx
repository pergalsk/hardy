import { render, screen, fireEvent, act } from "@testing-library/react";
import type { Har } from "@repo/har-types";
import { useAppStore, initialUiState, initialFilterState } from "../../../store/store";
import { mockHarEntry } from "../../../../src/test-fixtures";
import { SearchModal } from "./SearchModal";

const entries = [
  mockHarEntry,
  {
    ...mockHarEntry,
    request: { ...mockHarEntry.request, url: "https://other.org/login" },
    response: { ...mockHarEntry.response, cookies: [{ name: "sid", value: "s3cret" }] },
  },
];

const onClose = vi.fn();

beforeAll(() => {
  HTMLDialogElement.prototype.showModal = vi.fn();
  HTMLDialogElement.prototype.close = vi.fn();
});

beforeEach(() => {
  vi.useFakeTimers();
  onClose.mockClear();
  useAppStore.setState({
    files: [
      {
        fileId: "f1",
        name: "test.har",
        size: 0,
        data: { log: { entries, pages: [] } } as unknown as Har,
      },
    ],
    ui: { ...initialUiState, fileId: "f1" },
    filter: { ...initialFilterState, fields: { url: "", method: "", status: "" } },
  });
});

afterEach(() => {
  vi.useRealTimers();
});

const typeQuery = (value: string) => {
  fireEvent.change(screen.getByLabelText("Search", { selector: "input" }), {
    target: { value },
  });
  act(() => vi.advanceTimersByTime(200));
};

test("shows matches after typing", () => {
  render(<SearchModal open={true} onClose={onClose} />);
  typeQuery("s3cret");
  expect(screen.getByText("Response cookie")).toBeInTheDocument();
  expect(screen.getByText("1 results in 1 entries")).toBeInTheDocument();
});

test("shows no results message", () => {
  render(<SearchModal open={true} onClose={onClose} />);
  typeQuery("nothing-like-this");
  expect(screen.getByText("No results")).toBeInTheDocument();
});

test("clicking a match opens the entry, switches tab and closes", () => {
  render(<SearchModal open={true} onClose={onClose} />);
  typeQuery("s3cret");
  fireEvent.click(screen.getByText("Response cookie"));

  const { ui } = useAppStore.getState();
  expect(ui.rowId).toBe(1);
  expect(ui.tab).toBe("COO");
  expect(ui.searchTarget).toMatchObject({ section: "resCookie", label: "sid", query: "s3cret" });
  expect(onClose).toHaveBeenCalled();
});

test("asks to clear the filter when the entry is hidden", () => {
  useAppStore.setState((state) => ({
    filter: { ...state.filter, fields: { url: "example", method: "", status: "" } },
  }));
  render(<SearchModal open={true} onClose={onClose} />);
  typeQuery("s3cret");
  fireEvent.click(screen.getByText("Response cookie"));

  expect(screen.getByText(/hidden by the filter/)).toBeInTheDocument();
  expect(useAppStore.getState().ui.rowId).toBe(0);
  expect(onClose).not.toHaveBeenCalled();
});

test("cancel keeps everything as it is", () => {
  useAppStore.setState((state) => ({
    filter: { ...state.filter, fields: { url: "example", method: "", status: "" } },
  }));
  render(<SearchModal open={true} onClose={onClose} />);
  typeQuery("s3cret");
  fireEvent.click(screen.getByText("Response cookie"));
  fireEvent.click(screen.getByText("Cancel"));

  expect(screen.queryByText(/hidden by the filter/)).not.toBeInTheDocument();
  expect(useAppStore.getState().filter.fields.url).toBe("example");
  expect(useAppStore.getState().ui.rowId).toBe(0);
});

test("clear filter opens the entry", () => {
  useAppStore.setState((state) => ({
    filter: { ...state.filter, fields: { url: "example", method: "", status: "" } },
  }));
  render(<SearchModal open={true} onClose={onClose} />);
  typeQuery("s3cret");
  fireEvent.click(screen.getByText("Response cookie"));
  fireEvent.click(screen.getByText("Clear filter"));

  expect(useAppStore.getState().filter.fields.url).toBe("");
  expect(useAppStore.getState().ui.rowId).toBe(1);
  expect(onClose).toHaveBeenCalled();
});
