import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Method, methodColors } from "./method";

describe("Method", () => {
  it("renders the method string", () => {
    render(<Method method="GET" colored={false} />);
    expect(screen.getByText("GET")).toBeInTheDocument();
  });

  it("applies color class when colored=true for GET", () => {
    render(<Method method="GET" colored={true} />);
    expect(screen.getByText("GET")).toHaveClass(methodColors["GET"]!);
  });

  it("applies color class when colored=true for POST", () => {
    render(<Method method="POST" colored={true} />);
    expect(screen.getByText("POST")).toHaveClass(methodColors["POST"]!);
  });

  it("applies color class when colored=true for DELETE", () => {
    render(<Method method="DELETE" colored={true} />);
    expect(screen.getByText("DELETE")).toHaveClass(methodColors["DELETE"]!);
  });

  it("applies white text when colored=false", () => {
    render(<Method method="GET" colored={false} />);
    expect(screen.getByText("GET")).toHaveClass("text-white");
  });

  it("applies gray fallback for unknown method when colored=true", () => {
    render(<Method method="TRACE" colored={true} />);
    expect(screen.getByText("TRACE")).toHaveClass("text-gray-500");
  });

  it("applies font-bold", () => {
    render(<Method method="PUT" colored={true} />);
    expect(screen.getByText("PUT")).toHaveClass("font-bold");
  });
});
