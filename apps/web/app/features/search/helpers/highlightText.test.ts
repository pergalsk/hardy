import { highlightText } from "./highlightText";

beforeAll(() => {
  Element.prototype.scrollIntoView = vi.fn();
});

const makeContainer = (html: string) => {
  const container = document.createElement("div");
  container.innerHTML = html;
  document.body.appendChild(container);
  return container;
};

test("finds text split across nodes and scrolls to it", () => {
  const container = makeContainer("<span>Bear</span><b>er abc</b>");
  expect(highlightText(container, "bearer", "")).toBe(true);
  expect(container.querySelector("span")!.scrollIntoView).toHaveBeenCalled();
});

test("skips section titles", () => {
  const container = makeContainer('<div data-search-skip>json</div><span>other</span>');
  expect(highlightText(container, "json", "")).toBe(false);
});

test("falls back to scrolling the container when text is missing", () => {
  const container = makeContainer("<span>nothing</span>");
  expect(highlightText(container, "missing", "")).toBe(false);
  expect(container.scrollIntoView).toHaveBeenCalled();
});
