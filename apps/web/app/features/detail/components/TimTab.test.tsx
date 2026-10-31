import { render } from "@testing-library/react";
import { TimTab } from "./TimTab";

test("renders without crashing", () => {
  const { container } = render(
    <TimTab data={{ timings: {}, totalTime: 0 }} />,
  );
  expect(container).not.toBeEmptyDOMElement();
});
