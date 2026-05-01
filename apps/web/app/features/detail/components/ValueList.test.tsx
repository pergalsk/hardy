import { render } from "@testing-library/react";
import { ValueList } from "./ValueList";

test("renders without crashing", () => {
  const { container } = render(
    <ValueList data={[{ label: "key", value: "val" }]} />,
  );
  expect(container).not.toBeEmptyDOMElement();
});
