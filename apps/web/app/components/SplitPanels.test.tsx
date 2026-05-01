import { render } from "@testing-library/react";
import SplitPanels from "./SplitPanels";

test("renders without crashing", () => {
  const { container } = render(<SplitPanels left={<div>left</div>} right={<div>right</div>} />);
  expect(container).not.toBeEmptyDOMElement();
});
