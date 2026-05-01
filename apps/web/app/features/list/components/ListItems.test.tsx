import { render } from "@testing-library/react";
import { mockHarEntry } from "../../../../src/test-fixtures";
import { ListItems } from "./ListItems";

test("renders without crashing", () => {
  const { container } = render(<ListItems items={[mockHarEntry]} />);
  expect(container).not.toBeEmptyDOMElement();
});
