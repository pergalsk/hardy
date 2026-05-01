import { render } from "@testing-library/react";
import { FileSelect } from "./FileSelect";

test("renders without crashing", () => {
  const { container } = render(<FileSelect />);
  expect(container).not.toBeEmptyDOMElement();
});
