import { render } from "@testing-library/react";
import { WrongFile } from "./WrongFile";

test("renders without crashing", () => {
  const { container } = render(<WrongFile name="test.har" />);
  expect(container).not.toBeEmptyDOMElement();
});
