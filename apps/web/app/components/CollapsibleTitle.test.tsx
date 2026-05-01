import { render } from "@testing-library/react";
import { CollapsibleTitle } from "./CollapsibleTitle";

test("renders without crashing", () => {
  const { container } = render(<CollapsibleTitle title="Test" />);
  expect(container).not.toBeEmptyDOMElement();
});
