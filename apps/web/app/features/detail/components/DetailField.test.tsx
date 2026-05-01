import { render } from "@testing-library/react";
import { DetailField } from "./DetailField";

test("renders without crashing", () => {
  const { container } = render(<DetailField label="URL:">value</DetailField>);
  expect(container).not.toBeEmptyDOMElement();
});
