import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Status, statusColors } from "./status";

describe("Status", () => {
  it("renders the status code", () => {
    render(<Status status={200} text="OK" colored={false} />);
    expect(screen.getByText("200")).toBeInTheDocument();
  });

  it("renders the status text", () => {
    render(<Status status={200} text="OK" colored={false} />);
    expect(screen.getByText("OK")).toBeInTheDocument();
  });

  it("applies 2xx color when colored=true for 200", () => {
    render(<Status status={200} text="" colored={true} />);
    expect(screen.getByText("200")).toHaveClass(statusColors["2xx"]!.split(" ")[0]!);
  });

  it("applies 4xx color when colored=true for 404", () => {
    render(<Status status={404} text="Not Found" colored={true} />);
    expect(screen.getByText("404")).toHaveClass(statusColors["4xx"]!.split(" ")[0]!);
  });

  it("applies 5xx color when colored=true for 500", () => {
    render(<Status status={500} text="Error" colored={true} />);
    expect(screen.getByText("500")).toHaveClass(statusColors["5xx"]!.split(" ")[0]!);
  });

  it("applies 3xx color when colored=true for 301", () => {
    render(<Status status={301} text="Moved" colored={true} />);
    expect(screen.getByText("301")).toHaveClass(statusColors["3xx"]!.split(" ")[0]!);
  });

  it("applies neutral class when colored=false", () => {
    render(<Status status={200} text="" colored={false} />);
    expect(screen.getByText("200")).toHaveClass("bg-bunker-100");
  });

  it("does not render text span when text is empty", () => {
    render(<Status status={200} text="" colored={true} />);
    expect(screen.queryByText("OK")).not.toBeInTheDocument();
  });
});
