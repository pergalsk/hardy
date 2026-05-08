import { render, screen, fireEvent, act } from "@testing-library/react";
import { useAppStore } from "../../../store/store";
import { clearSorting } from "../actions";
import { ListSorting } from "./ListSorting";

test("renders without crashing", () => {
  const { container } = render(<ListSorting />);
  expect(container).not.toBeEmptyDOMElement();
});

describe("ListSorting — sort behavior", () => {
  beforeEach(() => {
    act(() => clearSorting());
  });

  it("clicking a sort button sets sortBy to that field", () => {
    render(<ListSorting />);
    fireEvent.click(screen.getByRole("button", { name: /^url$/i }));
    expect(useAppStore.getState().sorting.sortBy).toBe("url");
    expect(useAppStore.getState().sorting.sortDir).toBe("asc");
  });

  it("clicking the same sort button again toggles direction to desc", () => {
    render(<ListSorting />);
    fireEvent.click(screen.getByRole("button", { name: /^url$/i }));
    fireEvent.click(screen.getByRole("button", { name: /^url$/i }));
    expect(useAppStore.getState().sorting.sortBy).toBe("url");
    expect(useAppStore.getState().sorting.sortDir).toBe("desc");
  });

  it("clicking a different sort button changes sortBy and resets direction", () => {
    render(<ListSorting />);
    fireEvent.click(screen.getByRole("button", { name: /^url$/i }));
    fireEvent.click(screen.getByRole("button", { name: /^url$/i })); // now desc
    fireEvent.click(screen.getByRole("button", { name: /^status$/i }));
    expect(useAppStore.getState().sorting.sortBy).toBe("status");
    expect(useAppStore.getState().sorting.sortDir).toBe("asc");
  });

  it("clicking the same button three times cycles asc → desc → asc", () => {
    render(<ListSorting />);
    const btn = screen.getByRole("button", { name: /^method$/i });
    fireEvent.click(btn);
    fireEvent.click(btn);
    fireEvent.click(btn);
    expect(useAppStore.getState().sorting.sortDir).toBe("asc");
  });
});
