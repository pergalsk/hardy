import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import { useDragging } from "./useDragging";

function DropZone({ onDrop }: { onDrop: (e: DragEvent) => void }) {
  const [ref, isDragging] = useDragging<HTMLDivElement>(onDrop);
  return (
    <div ref={ref} data-testid="zone" data-dragging={isDragging}>
      <span data-testid="child">Drop here</span>
    </div>
  );
}

function setup() {
  const onDrop = vi.fn();
  render(<DropZone onDrop={onDrop} />);
  return {
    zone: screen.getByTestId("zone"),
    child: screen.getByTestId("child"),
    onDrop,
  };
}

test("highlights when drag enters the zone", () => {
  const { zone } = setup();
  fireEvent.dragEnter(zone);
  expect(zone).toHaveAttribute("data-dragging", "true");
});

test("keeps highlight when dragging over a child element", () => {
  const { zone, child } = setup();
  fireEvent.dragEnter(zone);
  // moving onto a child: dragenter on child, then dragleave on zone
  fireEvent.dragEnter(child);
  fireEvent.dragLeave(zone);
  expect(zone).toHaveAttribute("data-dragging", "true");
  // moving back from child to zone
  fireEvent.dragEnter(zone);
  fireEvent.dragLeave(child);
  expect(zone).toHaveAttribute("data-dragging", "true");
});

test("removes highlight when drag leaves the whole zone", () => {
  const { zone, child } = setup();
  fireEvent.dragEnter(zone);
  fireEvent.dragEnter(child);
  fireEvent.dragLeave(zone);
  fireEvent.dragLeave(child);
  expect(zone).toHaveAttribute("data-dragging", "false");
});

test("removes highlight and calls callback on drop over a child", () => {
  const { zone, child, onDrop } = setup();
  fireEvent.dragEnter(zone);
  fireEvent.dragEnter(child);
  fireEvent.dragLeave(zone);
  fireEvent.drop(child);
  expect(zone).toHaveAttribute("data-dragging", "false");
  expect(onDrop).toHaveBeenCalledTimes(1);

  // next drag starts clean
  fireEvent.dragEnter(zone);
  fireEvent.dragLeave(zone);
  expect(zone).toHaveAttribute("data-dragging", "false");
});
