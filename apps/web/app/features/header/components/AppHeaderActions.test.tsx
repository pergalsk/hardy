import { fireEvent, render, screen } from "@testing-library/react";
import {
  useAppStore,
  initialFilterState,
  initialUiPersistentState,
} from "../../../store/store";
import { AppHeaderActions } from "./AppHeaderActions";

test("renders without crashing", () => {
  const { container } = render(<AppHeaderActions />);
  expect(container).not.toBeEmptyDOMElement();
});

test("'Open file' in empty state opens the picker and keeps the filter unchanged", () => {
  const fields = { ...initialFilterState.fields, url: "keep-me" };
  useAppStore.setState({
    files: [],
    filter: { ...initialFilterState, fields },
    uiPersistent: { ...initialUiPersistentState, filterActive: true },
  });
  const inputClick = vi.spyOn(HTMLInputElement.prototype, "click");

  render(<AppHeaderActions />);
  fireEvent.click(screen.getByRole("button", { name: "Open file" }));

  expect(inputClick).toHaveBeenCalledTimes(1);
  expect(useAppStore.getState().uiPersistent.filterActive).toBe(true);
  expect(useAppStore.getState().filter.fields).toEqual(fields);

  inputClick.mockRestore();
});
