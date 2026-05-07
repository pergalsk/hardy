import { render } from "@testing-library/react";
import { FileReadError } from "./FileReadError";

test("renders without crashing", () => {
  const { container } = render(<FileReadError name="test.har" reason="The file contains invalid JSON." />);
  expect(container).not.toBeEmptyDOMElement();
});
