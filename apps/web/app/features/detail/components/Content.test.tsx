import { render } from "@testing-library/react";
import { Content } from "./Content";

test("renders without crashing", () => {
  const { container } = render(
    <Content data={{ headers: [], content: null, bodySize: -1 }} />,
  );
  expect(container).not.toBeEmptyDOMElement();
});
