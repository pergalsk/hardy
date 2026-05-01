import { render } from "@testing-library/react";
import { FooterItem } from "./FooterItem";

test("renders without crashing", () => {
  const { container } = render(<FooterItem label="Entries" value={42} />);
  expect(container).not.toBeEmptyDOMElement();
});
