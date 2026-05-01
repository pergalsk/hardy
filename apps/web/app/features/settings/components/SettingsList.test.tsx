import { render } from "@testing-library/react";
import SettingsList from "./SettingsList";
import { initialSettings } from "../../../store/store";

test("renders without crashing", () => {
  const items = [
    { key: "groupHidden" as const, label: "Group Hidden", type: "switch" as const },
  ];
  const { container } = render(
    <SettingsList items={items} form={initialSettings} onChange={() => {}} />,
  );
  expect(container).not.toBeEmptyDOMElement();
});
