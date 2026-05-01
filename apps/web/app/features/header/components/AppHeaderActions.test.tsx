import { render } from "@testing-library/react";
import { AppHeaderActions } from "./AppHeaderActions";

test("renders without crashing", () => {
  const { container } = render(<AppHeaderActions />);
  expect(container).not.toBeEmptyDOMElement();
});
