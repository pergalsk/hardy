import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Url } from "./url";

describe("Url", () => {
  it("renders domain and path", () => {
    render(<Url domain="example.com" path="/api/users" />);
    expect(screen.getByText("example.com")).toBeInTheDocument();
    expect(screen.getByText("/api/users")).toBeInTheDocument();
  });

  it("renders protocol when provided", () => {
    render(<Url protocol="https:" domain="example.com" path="/" />);
    expect(screen.getByText("https://")).toBeInTheDocument();
  });

  it("does not render protocol when not provided", () => {
    render(<Url domain="example.com" path="/" />);
    expect(screen.queryByText(/https/)).not.toBeInTheDocument();
  });

  it("renders port when provided", () => {
    render(<Url domain="example.com" port="8080" path="/" />);
    expect(screen.getByText(":8080")).toBeInTheDocument();
  });

  it("renders query params when provided", () => {
    render(<Url domain="example.com" path="/" params="?key=val" />);
    expect(screen.getByText("?key=val")).toBeInTheDocument();
  });

  it("renders hash when provided", () => {
    render(<Url domain="example.com" path="/" hash="#section" />);
    expect(screen.getByText("#section")).toBeInTheDocument();
  });

  it("path is bold", () => {
    render(<Url domain="example.com" path="/bold-path" />);
    expect(screen.getByText("/bold-path")).toHaveClass("font-bold");
  });
});
