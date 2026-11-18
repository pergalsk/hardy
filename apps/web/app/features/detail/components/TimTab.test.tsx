import { render, screen } from "@testing-library/react";
import { TimTab } from "./TimTab";

describe("TimTab", () => {
  it("shows the total time and a row per timing phase", () => {
    render(<TimTab data={{ timings: { send: 1, wait: 100, receive: 22 }, totalTime: 123 }} />);
    expect(screen.getByText(/Total request time/)).toHaveTextContent("123.00 ms");
    expect(screen.getAllByText("Wait").length).toBeGreaterThan(0);
  });

  it("shows no content when total time is zero", () => {
    render(<TimTab data={{ timings: {}, totalTime: 0 }} />);
    expect(screen.queryByText(/Total request time/)).not.toBeInTheDocument();
  });
});
