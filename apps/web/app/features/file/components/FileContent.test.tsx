import { render } from "@testing-library/react";
import { useAppStore, initialUiPersistentState } from "../../../store/store";
import { FileContent } from "./FileContent";

beforeEach(() => {
  useAppStore.setState({
    uiPersistent: { ...initialUiPersistentState, detailFormatterId: null },
  });
});

test("renders without crashing", () => {
  const { container } = render(<FileContent />);
  expect(container).not.toBeEmptyDOMElement();
});
