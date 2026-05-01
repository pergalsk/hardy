import { render } from "@testing-library/react";
import { useAppStore } from "../../../store/store";
import { mockHarEntry } from "../../../../src/test-fixtures";
import { Detail } from "./Detail";

beforeEach(() => {
  useAppStore.setState({
    files: [{ fileId: "f1", name: "test.har", size: 0, data: { log: { entries: [mockHarEntry], pages: [] } } }],
    ui: { fileId: "f1", rowId: 0, pinnedIds: new Set(), showPinnedOnly: false, tab: "REQ" },
  });
});

test("renders without crashing", () => {
  const { container } = render(<Detail />);
  expect(container).not.toBeEmptyDOMElement();
});
