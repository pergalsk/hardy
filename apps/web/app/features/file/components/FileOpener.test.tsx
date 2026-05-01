import { render } from "@testing-library/react";
import { FileOpener } from "./FileOpener";

test("renders without crashing", () => {
  const { container } = render(
    <FileOpener>
      <button>Open</button>
    </FileOpener>,
  );
  expect(container).not.toBeEmptyDOMElement();
});
