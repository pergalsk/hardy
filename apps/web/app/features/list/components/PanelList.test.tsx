import { render } from "@testing-library/react";
import { PanelList } from "./PanelList";

test("renders without crashing", () => {
  const { container } = render(<PanelList>content</PanelList>);
  expect(container).not.toBeEmptyDOMElement();
});
