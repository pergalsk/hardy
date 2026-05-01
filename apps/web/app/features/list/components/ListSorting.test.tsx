import { render } from "@testing-library/react";
import { ListSorting } from "./ListSorting";

test("renders without crashing", () => {
  const { container } = render(<ListSorting />);
  expect(container).not.toBeEmptyDOMElement();
});
