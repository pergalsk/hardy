import { render } from "@testing-library/react";
import { Settings } from "./Settings";

test("renders without crashing", () => {
  const { container } = render(<Settings />);
  expect(container).not.toBeEmptyDOMElement();
});
