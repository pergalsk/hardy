import { render } from "@testing-library/react";
import { FileOpenDarkSvg } from "./FileOpenDarkSvg";

test("renders without crashing", () => {
  const { container } = render(<FileOpenDarkSvg />);
  expect(container).not.toBeEmptyDOMElement();
});
