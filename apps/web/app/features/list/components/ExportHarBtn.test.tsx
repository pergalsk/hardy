import { render, screen } from "@testing-library/react";
import type { Har } from "@repo/har-types";
import {
  useAppStore,
  initialFilterState,
  initialUiState,
} from "../../../store/store";
import { mockHarEntry } from "../../../../src/test-fixtures";
import { ExportHarBtn } from "./ExportHarBtn";

const openFile = () =>
  useAppStore.setState({
    files: [
      {
        fileId: "f1",
        name: "test.har",
        size: 0,
        data: { log: { entries: [mockHarEntry], pages: [] } } as unknown as Har,
      },
    ],
    ui: { ...initialUiState, fileId: "f1", pinnedIds: new Set() },
  });

beforeEach(() => {
  useAppStore.setState({
    files: [],
    filter: { ...initialFilterState, fields: { ...initialFilterState.fields } },
    ui: { ...initialUiState, pinnedIds: new Set() },
  });
});

test("renders disabled when no file is open", () => {
  render(<ExportHarBtn />);
  expect(screen.getByRole("button")).toHaveClass("pointer-events-none");
});

test("renders enabled when a file is open and entries are visible", () => {
  openFile();
  render(<ExportHarBtn />);
  expect(screen.getByRole("button")).not.toHaveClass("pointer-events-none");
});

test("renders disabled when the filter hides all entries", () => {
  openFile();
  useAppStore.setState({
    filter: {
      ...initialFilterState,
      fields: { ...initialFilterState.fields, url: "no-such-url-xyz" },
    },
  });
  render(<ExportHarBtn />);
  expect(screen.getByRole("button")).toHaveClass("pointer-events-none");
});
