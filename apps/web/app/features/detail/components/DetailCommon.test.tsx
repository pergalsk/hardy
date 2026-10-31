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
