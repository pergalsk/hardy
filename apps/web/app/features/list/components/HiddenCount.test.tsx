import { render } from "@testing-library/react";
import { HiddenCount } from "./HiddenCount";

test("renders without crashing", () => {
  const { container } = render(<HiddenCount count={3} />);
  expect(container).not.toBeEmptyDOMElement();
});
