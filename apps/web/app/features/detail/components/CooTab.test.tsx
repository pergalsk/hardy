import { render } from "@testing-library/react";
import { CooTab } from "./CooTab";

test("renders without crashing", () => {
  const { container } = render(
    <CooTab data={{ cookies: { request: [], response: [] } }} />,
  );
  expect(container).not.toBeEmptyDOMElement();
});
