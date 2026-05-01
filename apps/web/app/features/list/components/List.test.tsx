import { render } from "@testing-library/react";
import { List } from "./List";

test("renders without crashing", () => {
  const { container } = render(<List />);
  expect(container).not.toBeEmptyDOMElement();
});
