import { act, render, screen } from "@testing-library/react";
import type { ContentValue, Formatter } from "@repo/formatter-core";
import { contentValueFormatters } from "@repo/formatter-core/registry";
import { useAppStore } from "../../../store/store";
import { Content } from "./Content";

const prettyFormatter: Formatter<ContentValue> = {
  id: "test-pretty",
  title: "Pretty",
  icon: "",
  tooltip: "Pretty",
  format: (content) => `pretty:${content.value}`,
};

const originalFormatter: Formatter<ContentValue> = {
  id: "test-original",
  title: "Original",
  icon: "",
  tooltip: "Original",
  fallback: true,
  format: (content) => `original:${content.value}`,
};

contentValueFormatters.addFormatters("application/json", [prettyFormatter, originalFormatter]);

const textData = {
  headers: [{ name: "Content-Type", value: "text/plain" }],
  headersSize: 0,
  content: "hello",
  bodySize: 5,
};

const jsonData = {
  headers: [{ name: "Content-Type", value: "application/json" }],
  headersSize: 0,
  content: '{"a":1}',
  bodySize: 7,
};

beforeEach(() => {
  useAppStore.setState((state) => ({ ui: { ...state.ui, searchTarget: null } }));
});

test("renders without crashing", () => {
  const { container } = render(
    <Content data={{ headers: [], headersSize: 0, content: undefined, bodySize: -1 }} />,
  );
  expect(container).not.toBeEmptyDOMElement();
});

test("switching from a non-JSON to a JSON entry shows the formatted JSON", () => {
  const { rerender } = render(<Content data={textData} />);
  expect(screen.getByText("hello")).toBeInTheDocument();

  rerender(<Content data={jsonData} />);

  expect(screen.getByText('pretty:{"a":1}')).toBeInTheDocument();
});

test("search jump into the body switches to the fallback formatter", () => {
  render(<Content data={jsonData} searchSection="resBody" />);
  expect(screen.getByText('pretty:{"a":1}')).toBeInTheDocument();

  act(() => {
    useAppStore.setState((state) => ({
      ui: {
        ...state.ui,
        searchTarget: { section: "resBody", label: "", query: "a", key: 1 },
      },
    }));
  });

  expect(screen.getByText('original:{"a":1}')).toBeInTheDocument();
});
