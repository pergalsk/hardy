import { render } from "@testing-library/react";
import { FormatterHostBridge } from "./FormatterHostBridge";

test("renders without crashing", () => {
  const { container } = render(
    <FormatterHostBridge>
      <div />
    </FormatterHostBridge>,
  );
  expect(container).not.toBeEmptyDOMElement();
});
