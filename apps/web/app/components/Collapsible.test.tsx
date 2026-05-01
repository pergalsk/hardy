import { render } from "@testing-library/react";
import { Collapsible } from "./Collapsible";

test("renders without crashing", () => {
  const { container } = render(<Collapsible>content</Collapsible>);
  expect(container).not.toBeEmptyDOMElement();
});
