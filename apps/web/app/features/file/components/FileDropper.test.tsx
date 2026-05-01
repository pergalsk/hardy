import { render } from "@testing-library/react";
import { FileDropper } from "./FileDropper";

test("renders without crashing", () => {
  const { container } = render(<FileDropper />);
  expect(container).not.toBeEmptyDOMElement();
});
