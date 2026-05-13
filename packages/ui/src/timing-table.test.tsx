import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { TimingTable } from "./timing-table";
import type { TimingRow } from "./timing-table";

const rows: TimingRow[] = [
  { key: "dns", color: "#4caf50", name: "DNS", description: "DNS lookup", value: 12.5, pct: 25 },
  { key: "connect", color: "#2196f3", name: "Connect/SSL", description: "TCP connect", value: 10.0, pct: 20 },
  { key: "ssl", color: "#c09038", name: "SSL", description: "SSL handshake", value: 5.0, pct: 10 },
];

describe("TimingTable", () => {
  it("renders a table element", () => {
    render(<TimingTable rows={rows} totalTime={50} />);
    expect(screen.getByRole("table")).toBeInTheDocument();
  });

  it("renders row names", () => {
    render(<TimingTable rows={rows} totalTime={50} />);
    expect(screen.getByText("DNS")).toBeInTheDocument();
    expect(screen.getByText("Connect/SSL")).toBeInTheDocument();
  });

  it("renders row descriptions", () => {
    render(<TimingTable rows={rows} totalTime={50} />);
    expect(screen.getByText("DNS lookup")).toBeInTheDocument();
    expect(screen.getByText("TCP connect")).toBeInTheDocument();
  });

  it("renders formatted time values", () => {
    render(<TimingTable rows={rows} totalTime={50} />);
    expect(screen.getByText("12.50 ms")).toBeInTheDocument();
    expect(screen.getByText("10.00 ms")).toBeInTheDocument();
  });

  it("renders percentage values", () => {
    render(<TimingTable rows={rows} totalTime={50} />);
    expect(screen.getByText("25.0%")).toBeInTheDocument();
    expect(screen.getByText("20.0%")).toBeInTheDocument();
  });

  it("renders total time row", () => {
    render(<TimingTable rows={rows} totalTime={50} />);
    expect(screen.getByText("Total")).toBeInTheDocument();
    expect(screen.getByText("50.00 ms")).toBeInTheDocument();
  });

  it("calls onHover with key on row mouse enter", () => {
    const onHover = vi.fn();
    render(<TimingTable rows={rows} totalTime={50} onHover={onHover} />);
    fireEvent.mouseEnter(screen.getByText("DNS").closest("tr")!);
    expect(onHover).toHaveBeenCalledWith("dns");
  });

  it("calls onHover with null on row mouse leave", () => {
    const onHover = vi.fn();
    render(<TimingTable rows={rows} totalTime={50} onHover={onHover} />);
    fireEvent.mouseLeave(screen.getByText("DNS").closest("tr")!);
    expect(onHover).toHaveBeenCalledWith(null);
  });

  it("highlights hovered row", () => {
    render(<TimingTable rows={rows} totalTime={50} hoveredKeys={["dns"]} />);
    const dnsRow = screen.getByText("DNS").closest("tr");
    expect(dnsRow).toHaveStyle("background-color: rgba(0,0,0,0.06)");
  });

  it("highlights both sub-segment and parent row when hoveredKeys includes both", () => {
    render(<TimingTable rows={rows} totalTime={50} hoveredKeys={["ssl", "connect"]} />);
    const connectRow = screen.getByText("Connect/SSL").closest("tr");
    const sslRow = screen.getByText("SSL").closest("tr");
    expect(connectRow).toHaveStyle("background-color: rgba(0,0,0,0.06)");
    expect(sslRow).toHaveStyle("background-color: rgba(0,0,0,0.06)");
  });

  it("highlights both parent and child row when hoveredKeys includes both", () => {
    render(<TimingTable rows={rows} totalTime={50} hoveredKeys={["connect", "ssl"]} />);
    const connectRow = screen.getByText("Connect/SSL").closest("tr");
    const sslRow = screen.getByText("SSL").closest("tr");
    expect(connectRow).toHaveStyle("background-color: rgba(0,0,0,0.06)");
    expect(sslRow).toHaveStyle("background-color: rgba(0,0,0,0.06)");
  });
});
