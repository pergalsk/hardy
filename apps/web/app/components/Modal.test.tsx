import { render } from "@testing-library/react";
import Modal from "./Modal";

test("renders without crashing", () => {
  const { container } = render(
    <Modal isOpen={false} onClose={() => {}}>
      content
    </Modal>,
  );
  expect(container).not.toBeEmptyDOMElement();
});
