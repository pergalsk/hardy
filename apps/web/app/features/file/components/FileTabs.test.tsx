import { render } from "@testing-library/react";
import { FileTabs } from "./FileTabs";

test("renders without crashing", () => {
  const { container } = render(<FileTabs />);
  expect(container).not.toBeEmptyDOMElement();
});
