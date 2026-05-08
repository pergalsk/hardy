import { render, fireEvent, screen } from "@testing-library/react";
import Modal from "./Modal";

beforeEach(() => {
  HTMLDialogElement.prototype.showModal = vi.fn();
  HTMLDialogElement.prototype.close = vi.fn();
});

test("renders without crashing", () => {
  const { container } = render(
    <Modal isOpen={false} onClose={() => {}}>
      content
    </Modal>,
  );
  expect(container).not.toBeEmptyDOMElement();
});

describe("Modal — closed state", () => {
  it("does not call showModal when isOpen is false", () => {
    render(<Modal isOpen={false} onClose={() => {}}>content</Modal>);
    expect(HTMLDialogElement.prototype.showModal).not.toHaveBeenCalled();
  });

  it("calls showModal when isOpen is true", () => {
    render(<Modal isOpen={true} onClose={() => {}}>content</Modal>);
    expect(HTMLDialogElement.prototype.showModal).toHaveBeenCalledOnce();
  });
});

describe("Modal — Escape key", () => {
  it("calls onClose when Escape is pressed", () => {
    const onClose = vi.fn();
    render(<Modal isOpen={true} onClose={onClose}>content</Modal>);
    fireEvent.keyDown(window, { key: "Escape" });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("does not call onClose for other keys", () => {
    const onClose = vi.fn();
    render(<Modal isOpen={true} onClose={onClose}>content</Modal>);
    fireEvent.keyDown(window, { key: "Enter" });
    expect(onClose).not.toHaveBeenCalled();
  });
});

describe("Modal — backdrop click", () => {
  it("calls onClose when the dialog backdrop is clicked", () => {
    const onClose = vi.fn();
    const { container } = render(
      <Modal isOpen={true} onClose={onClose} title="Test">content</Modal>,
    );
    const dialog = container.querySelector("dialog")!;
    fireEvent.pointerDown(dialog, { target: dialog });
    fireEvent.pointerUp(dialog, { target: dialog });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("does not call onClose when closeOnBackdropClick is false", () => {
    const onClose = vi.fn();
    const { container } = render(
      <Modal isOpen={true} onClose={onClose} closeOnBackdropClick={false}>
        content
      </Modal>,
    );
    const dialog = container.querySelector("dialog")!;
    fireEvent.pointerDown(dialog, { target: dialog });
    fireEvent.pointerUp(dialog, { target: dialog });
    expect(onClose).not.toHaveBeenCalled();
  });

  it("does not call onClose when pointerDown starts inside the panel (not backdrop)", () => {
    const onClose = vi.fn();
    const { container } = render(
      <Modal isOpen={true} onClose={onClose}>content</Modal>,
    );
    const dialog = container.querySelector("dialog")!;
    const panel = dialog.querySelector("div")!;
    fireEvent.pointerDown(panel, { target: panel });
    fireEvent.pointerUp(dialog, { target: dialog });
    expect(onClose).not.toHaveBeenCalled();
  });
});

describe("Modal — close button", () => {
  it("calls onClose when the close button is clicked", () => {
    const onClose = vi.fn();
    render(<Modal isOpen={true} onClose={onClose} title="Test">content</Modal>);
    // dialog is not "open" in jsdom (showModal is mocked), so query with hidden:true
    fireEvent.click(screen.getByRole("button", { name: "Close", hidden: true }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
