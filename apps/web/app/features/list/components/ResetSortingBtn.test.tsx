import { render } from "@testing-library/react";
import ResetSortingBtn from "./ResetSortingBtn";

test("renders without crashing", () => {
  const { container } = render(
    <ResetSortingBtn isActive={false} onClick={() => {}} />,
  );
  expect(container).not.toBeEmptyDOMElement();
});
