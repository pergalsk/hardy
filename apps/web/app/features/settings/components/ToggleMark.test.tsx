import { render } from "@testing-library/react";
import { ToggleMark } from "./ToggleMark";

test("renders without crashing", () => {
  const { container } = render(<ToggleMark opened={false} />);
  expect(container).not.toBeEmptyDOMElement();
});
