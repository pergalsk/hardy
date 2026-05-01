import { render } from "@testing-library/react";
import { FileTab } from "./FileTab";

test("renders without crashing", () => {
  const { container } = render(
    <FileTab file={{ name: "test.har", fileId: "f1" }} />,
  );
  expect(container).not.toBeEmptyDOMElement();
});
