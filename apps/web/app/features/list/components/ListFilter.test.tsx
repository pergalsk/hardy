import { render } from "@testing-library/react";
import { ListFilter } from "./ListFilter";

test("renders without crashing", () => {
  const { container } = render(<ListFilter />);
  expect(container).not.toBeEmptyDOMElement();
});
