import { render } from "@testing-library/react";
import { FileOpenLightSvg } from "./FileOpenLightSvg";

test("renders without crashing", () => {
  const { container } = render(<FileOpenLightSvg />);
  expect(container).not.toBeEmptyDOMElement();
});
