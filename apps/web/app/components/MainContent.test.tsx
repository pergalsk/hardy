import { render } from "@testing-library/react";
import { MainContent } from "./MainContent";

test("renders without crashing", () => {
  const { container } = render(<MainContent />);
  expect(container).not.toBeEmptyDOMElement();
});
