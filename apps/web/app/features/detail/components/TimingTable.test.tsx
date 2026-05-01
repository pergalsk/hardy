import { render } from "@testing-library/react";
import { TimingTable } from "./TimingTable";

test("renders without crashing", () => {
  const { container } = render(
    <TimingTable timings={{ send: 1, wait: 100, receive: 22 }} totalTime={123} />,
  );
  expect(container).not.toBeEmptyDOMElement();
});
