import { render } from "@testing-library/react";
import ListSortingBtn from "./ListSortingBtn";

test("renders without crashing", () => {
  const { container } = render(
    <ListSortingBtn
      sortKey="url"
      label="URL"
      isSelected={false}
      sortDir="asc"
      onClick={() => {}}
    />,
  );
  expect(container).not.toBeEmptyDOMElement();
});
