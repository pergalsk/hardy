import { render } from "@testing-library/react";
import { PageRef } from "./PageRef";

test("renders without crashing", () => {
  const { container } = render(<PageRef pageref="page_1" />);
  expect(container).not.toBeEmptyDOMElement();
});
