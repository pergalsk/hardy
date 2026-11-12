import { render, screen } from "@testing-library/react";
import { ExportHarBtn } from "./ExportHarBtn";

test("renders disabled when no file is open", () => {
  render(<ExportHarBtn />);
  expect(screen.getByRole("button")).toHaveClass("pointer-events-none");
});
