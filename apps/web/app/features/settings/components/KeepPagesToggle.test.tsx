import { render } from "@testing-library/react";
import KeepPagesToggle from "./KeepPagesToggle";

test("renders without crashing", () => {
  const { container } = render(
    <KeepPagesToggle isActive={false} checked={false} onChange={() => {}} />,
  );
  expect(container).not.toBeEmptyDOMElement();
});
