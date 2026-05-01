import { render } from "@testing-library/react";
import { mockHarEntry } from "../../../../src/test-fixtures";
import { PageRefGroup } from "./PageRefGroup";

test("renders without crashing", () => {
  const { container } = render(
    <PageRefGroup items={[mockHarEntry]} />,
  );
  expect(container).not.toBeEmptyDOMElement();
});
