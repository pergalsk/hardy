import { render } from "@testing-library/react";
import { ResTab } from "./ResTab";

test("renders without crashing", () => {
  const { container } = render(
    <ResTab data={{ headers: [], headersSize: 0, content: null, bodySize: -1 }} />,
  );
  expect(container).not.toBeEmptyDOMElement();
});
