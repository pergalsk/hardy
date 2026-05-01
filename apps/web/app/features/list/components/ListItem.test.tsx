import { render } from "@testing-library/react";
import { mockHarEntry } from "../../../../src/test-fixtures";
import { ListItem } from "./ListItem";

test("renders without crashing", () => {
  const { container } = render(
    <ListItem item={mockHarEntry} isSelected={false} isPinned={false} />,
  );
  expect(container).not.toBeEmptyDOMElement();
});
