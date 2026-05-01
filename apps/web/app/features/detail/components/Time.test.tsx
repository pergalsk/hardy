import { render } from "@testing-library/react";
import { Time } from "./Time";

test("renders without crashing", () => {
  const { container } = render(<Time time={123.45} />);
  expect(container).not.toBeEmptyDOMElement();
});
