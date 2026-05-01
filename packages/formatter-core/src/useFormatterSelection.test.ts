// @vitest-environment jsdom
import { describe, it, expect, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import type { Formatter } from "./Formatter";
import { useFormatterSelection } from "./useFormatterSelection";

function makeFormatter(id: string): Formatter<string> {
  return {
    id,
    title: id,
    icon: "",
    tooltip: "",
    format: vi.fn((data: string) => data),
  };
}

describe("useFormatterSelection", () => {
  it("returns empty activeId and null formatFn when formatterList is null", () => {
    const { result } = renderHook(() => useFormatterSelection(null));
    expect(result.current.activeId).toBe("");
    expect(result.current.formatFn).toBeNull();
  });

  it("seeds activeId from the first key in formatterList", () => {
    const fmt = makeFormatter("fmt-a");
    const { result } = renderHook(() =>
      useFormatterSelection({ "fmt-a": fmt }),
    );
    expect(result.current.activeId).toBe("fmt-a");
    expect(result.current.formatFn).toBe(fmt.format);
  });

  it("switches formatFn when setActiveId is called", () => {
    const fmtA = makeFormatter("fmt-a");
    const fmtB = makeFormatter("fmt-b");
    const list = { "fmt-a": fmtA, "fmt-b": fmtB };

    const { result } = renderHook(() => useFormatterSelection(list));

    expect(result.current.activeId).toBe("fmt-a");
    expect(result.current.formatFn).toBe(fmtA.format);

    act(() => result.current.setActiveId("fmt-b"));

    expect(result.current.activeId).toBe("fmt-b");
    expect(result.current.formatFn).toBe(fmtB.format);
  });

  it("returns null formatFn when activeId has no match in formatterList", () => {
    const fmt = makeFormatter("fmt-a");
    const { result } = renderHook(() =>
      useFormatterSelection({ "fmt-a": fmt }),
    );

    act(() => result.current.setActiveId("nonexistent"));

    expect(result.current.formatFn).toBeNull();
  });
});
