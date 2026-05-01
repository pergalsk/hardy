import { render } from "@testing-library/react";
import { DetailSegment } from "./DetailSegment";

test("renders without crashing", () => {
  const { container } = render(<DetailSegment>content</DetailSegment>);
  expect(container).not.toBeEmptyDOMElement();
});
