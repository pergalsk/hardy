import { render, screen } from "@testing-library/react";
import { Logo } from "./Logo";

test("renders logo image and name", () => {
  render(<Logo />);
  expect(screen.getByRole("img", { name: "HARDY logo" })).toBeInTheDocument();
  expect(screen.getByText("HARDY")).toBeInTheDocument();
});
