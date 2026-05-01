import { render } from "@testing-library/react";
import { ToastItem } from "./ToastItem";

test("renders without crashing", () => {
  const { container } = render(
    <ToastItem id="t1" message="Something happened" type="info" />,
  );
  expect(container).not.toBeEmptyDOMElement();
});
