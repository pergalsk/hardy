import { render } from "@testing-library/react";
import { ReqTab } from "./ReqTab";

test("renders without crashing", () => {
  const { container } = render(
    <ReqTab data={{ headers: [], headersSize: 0, content: null, bodySize: -1 }} />,
  );
  expect(container).not.toBeEmptyDOMElement();
});
