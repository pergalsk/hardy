import { render } from "@testing-library/react";
import { Logo } from "./Logo";

test("renders without crashing", () => {
  const { container } = render(<Logo />);
  expect(container).not.toBeEmptyDOMElement();
});
