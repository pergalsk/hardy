import { render } from "@testing-library/react";
import { useAppStore } from "../../../store/store";
import { ToastList } from "./ToastList";

beforeEach(() => {
  useAppStore.setState({
    toasts: [{ id: "t1", message: "Hello", type: "info" }],
  });
});

test("renders without crashing", () => {
  const { container } = render(<ToastList />);
  expect(container).not.toBeEmptyDOMElement();
});
