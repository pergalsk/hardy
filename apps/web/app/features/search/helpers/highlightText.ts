export const HIGHLIGHT_NAME = "search-hit";

type NodePosition = { node: Text; start: number };

const findPosition = (positions: NodePosition[], offset: number) => {
  let found = positions[0]!;
  for (const position of positions) {
    if (position.start > offset) break;
    found = position;
  }
  return { node: found.node, offset: offset - found.start };
};

/**
 * Finds the query in the container text (after the label, when given),
 * highlights it with the CSS Custom Highlight API and scrolls to it.
 * Falls back to scrolling to the container. Returns true when text was found.
 */
export function highlightText(container: HTMLElement, query: string, label: string): boolean {
  const positions: NodePosition[] = [];
  let text = "";

  // skip text of section titles, so only the section content is searched
  const walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT, (node) =>
    node.parentElement?.closest("[data-search-skip]")
      ? NodeFilter.FILTER_REJECT
      : NodeFilter.FILTER_ACCEPT,
  );
  while (walker.nextNode()) {
    const node = walker.currentNode as Text;
    positions.push({ node, start: text.length });
    text += node.data;
  }

  const lower = text.toLowerCase();
  const needle = query.toLowerCase();
  const labelIndex = label ? lower.indexOf(label.toLowerCase()) : -1;
  let index = lower.indexOf(needle, Math.max(0, labelIndex));
  if (index === -1) index = lower.indexOf(needle);

  if (index === -1 || !needle) {
    container.scrollIntoView({ block: "start" });
    return false;
  }

  const start = findPosition(positions, index);
  const end = findPosition(positions, index + needle.length - 1);
  const range = document.createRange();
  range.setStart(start.node, start.offset);
  range.setEnd(end.node, end.offset + 1);

  if (typeof CSS !== "undefined" && "highlights" in CSS) {
    CSS.highlights.set(HIGHLIGHT_NAME, new Highlight(range));
  }
  start.node.parentElement?.scrollIntoView({ block: "center" });
  return true;
}

export function clearHighlight(): void {
  if (typeof CSS !== "undefined" && "highlights" in CSS) {
    CSS.highlights.delete(HIGHLIGHT_NAME);
  }
}
