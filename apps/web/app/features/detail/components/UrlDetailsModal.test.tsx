import { render } from "@testing-library/react";
import UrlDetailsModal from "./UrlDetailsModal";

test("renders without crashing", () => {
  const { container } = render(
    <UrlDetailsModal url="https://example.com/api?foo=bar" />,
  );
  expect(container).not.toBeEmptyDOMElement();
});
