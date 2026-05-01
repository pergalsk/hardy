import { render } from "@testing-library/react";
import { mockHarEntry } from "../../../../src/test-fixtures";
import { HiddenItemsGroup } from "./HiddenItemsGroup";

test("renders without crashing", () => {
  const { container } = render(
    <HiddenItemsGroup group={[{ ...mockHarEntry, $$hidden: true }]} />,
  );
  expect(container).not.toBeEmptyDOMElement();
});
