// @vitest-environment jsdom
import { renderHook } from "@testing-library/react";
import { describe, it, expect, vi, afterEach } from "vitest";
import { useDarkMode } from "./useDarkMode";

function mockMatchMedia(matches: boolean) {
  return vi.fn().mockImplementation((query: string) => ({
    matches,
    media: query,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  }));
}

describe("useDarkMode", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("returns true when dark mode is preferred", () => {
    vi.stubGlobal("matchMedia", mockMatchMedia(true));
    const { result } = renderHook(() => useDarkMode());
    expect(result.current).toBe(true);
  });

  it("returns false when dark mode is not preferred", () => {
    vi.stubGlobal("matchMedia", mockMatchMedia(false));
    const { result } = renderHook(() => useDarkMode());
    expect(result.current).toBe(false);
  });
});
