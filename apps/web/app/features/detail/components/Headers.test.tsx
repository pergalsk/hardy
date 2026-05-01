import { render } from "@testing-library/react";
import { Headers } from "./Headers";

test("renders without crashing", () => {
  const { container } = render(
    <Headers data={{ headers: [], headersSize: 0 }} />,
  );
  expect(container).not.toBeEmptyDOMElement();
});
