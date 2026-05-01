import { render } from "@testing-library/react";
import { Panel } from "./Panel";

test("renders without crashing", () => {
  const { container } = render(<Panel>content</Panel>);
  expect(container).not.toBeEmptyDOMElement();
});
