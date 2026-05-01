import { render } from "@testing-library/react";
import { Navigation } from "./Navigation";

test("renders without crashing", () => {
  const { container } = render(<Navigation>content</Navigation>);
  expect(container).not.toBeEmptyDOMElement();
});
