import { render } from "@testing-library/react";
import ListItemWrapper from "./ListItemWrapper";

test("renders without crashing", () => {
  const { container } = render(
    <ListItemWrapper>content</ListItemWrapper>,
  );
  expect(container).not.toBeEmptyDOMElement();
});
