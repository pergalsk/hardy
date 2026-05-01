import { render } from "@testing-library/react";
import SettingsModal from "./SettingsModal";

test("renders without crashing", () => {
  const { container } = render(
    <SettingsModal open={false} onClose={() => {}} />,
  );
  expect(container).not.toBeEmptyDOMElement();
});
