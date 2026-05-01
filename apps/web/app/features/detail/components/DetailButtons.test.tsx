import { render } from "@testing-library/react";
import { DetailButtons } from "./DetailButtons";

test("renders without crashing", () => {
  const { container } = render(<DetailButtons />);
  expect(container).not.toBeEmptyDOMElement();
});
