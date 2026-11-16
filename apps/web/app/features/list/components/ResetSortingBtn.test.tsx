import { render, screen, fireEvent } from "@testing-library/react";
import ResetSortingBtn from "./ResetSortingBtn";

test("renders without crashing", () => {
  const { container } = render(
    <ResetSortingBtn isActive={false} onClick={() => {}} />,
  );
  expect(container).not.toBeEmptyDOMElement();
});

test("has a label and ignores clicks when not active", () => {
  const onClick = vi.fn();
  render(<ResetSortingBtn isActive={false} onClick={onClick} />);
  const button = screen.getByRole("button", { name: "Reset sorting" });
  expect(button).toHaveAttribute("aria-disabled", "true");
  fireEvent.click(button);
  expect(onClick).not.toHaveBeenCalled();
});
