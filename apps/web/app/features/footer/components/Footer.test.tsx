import { render } from "@testing-library/react";
import { Footer } from "./Footer";

test("renders without crashing", () => {
  const { container } = render(<Footer />);
  expect(container).not.toBeEmptyDOMElement();
});
