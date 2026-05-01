import { render } from "@testing-library/react";
import UrlQueryTable from "./UrlQueryTable";

test("renders without crashing", () => {
  const { container } = render(
    <UrlQueryTable entries={[["foo", "bar"]]} />,
  );
  expect(container).not.toBeEmptyDOMElement();
});
