import { fireEvent, render, screen } from "@testing-library/react";
import { useAppStore, initialUiState } from "../../../store/store";
import { FileTab } from "./FileTab";

const files = [
  { fileId: "f1", name: "one.har", size: 0, data: null },
  { fileId: "f2", name: "two.har", size: 0, data: null },
];

beforeEach(() => {
  useAppStore.setState({
    files,
    ui: { ...initialUiState, fileId: "f2", pinnedIds: new Set() },
  });
});

test("renders without crashing", () => {
  const { container } = render(
    <FileTab file={{ name: "test.har", fileId: "f1" }} />,
  );
  expect(container).not.toBeEmptyDOMElement();
});

test("clicking the tab switches to its file", () => {
  render(<FileTab file={files[0]!} />);

  fireEvent.click(screen.getByText("one.har"));

  expect(useAppStore.getState().ui.fileId).toBe("f1");
});

test("clicking close removes the file without switching to it", () => {
  const { container } = render(<FileTab file={files[0]!} />);

  fireEvent.click(container.querySelector(".material-symbols--close-rounded")!);

  const state = useAppStore.getState();
  expect(state.files.map((f) => f.fileId)).toEqual(["f2"]);
  expect(state.ui.fileId).toBe("f2");
});
