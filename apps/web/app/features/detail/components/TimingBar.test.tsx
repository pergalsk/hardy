import { render } from "@testing-library/react";
import { TimingBar } from "./TimingBar";

test("renders without crashing", () => {
  const { container } = render(
    <TimingBar timings={{ send: 1, wait: 100, receive: 22 }} totalTime={123} />,
  );
  expect(container).not.toBeEmptyDOMElement();
});
