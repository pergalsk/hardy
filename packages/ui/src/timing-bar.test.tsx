import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { TimingBar } from "./timing-bar";
import type { TimingSegment } from "./timing-bar";

const segment: TimingSegment = {
  key: "dns",
  color: "#4caf50",
  name: "DNS",
  value: 12.5,
  pct: 25,
  widthPct: 25,
  leftPct: 0,
};

describe("TimingBar", () => {
  it("renders a container div", () => {
    const { container } = render(<TimingBar segments={[segment]} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("renders nothing (null) when segments is empty", () => {
    const { container } = render(<TimingBar segments={[]} />);
    expect(container.firstChild).toBeNull();
  });

  it("renders container div with w-full when segments are provided", () => {
    const { container } = render(<TimingBar segments={[segment]} />);
    expect(container.firstChild).toHaveClass("w-full");
  });

  it("accepts hoveredKey prop", () => {
    const { container } = render(
      <TimingBar segments={[segment]} hoveredKey="dns" />
    );
    expect(container.firstChild).toBeInTheDocument();
  });

  it("accepts onHover callback", () => {
    const { container } = render(
      <TimingBar segments={[segment]} onHover={() => {}} />
    );
    expect(container.firstChild).toBeInTheDocument();
  });
});
