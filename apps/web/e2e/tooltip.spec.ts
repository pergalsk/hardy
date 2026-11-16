import { test, expect, type Page, type Locator } from "@playwright/test";
import { openHar } from "./helpers";

test.beforeEach(async ({ page }) => {
  await openHar(page);
});

const nav = (page: Page) => page.locator("nav");

async function expectInsideViewport(page: Page, locator: Locator) {
  const box = await locator.boundingBox();
  const viewport = page.viewportSize();
  expect(box).not.toBeNull();
  expect(viewport).not.toBeNull();
  expect(box!.x).toBeGreaterThanOrEqual(0);
  expect(box!.y).toBeGreaterThanOrEqual(0);
  expect(box!.x + box!.width).toBeLessThanOrEqual(viewport!.width);
  expect(box!.y + box!.height).toBeLessThanOrEqual(viewport!.height);
}

test("toolbar icons have accessible names", async ({ page }) => {
  for (const name of [
    "Search",
    "Filter list",
    "Sort list",
    "Group by pages",
    "Show pinned only",
    "Unpin all",
    "Export HAR",
    "Settings",
  ]) {
    await expect(
      nav(page).getByRole("button", { name, exact: true }),
    ).toBeVisible();
  }
});

test("hovering the last toolbar icon shows a tooltip inside the viewport", async ({
  page,
}) => {
  await nav(page).getByRole("button", { name: "Settings" }).hover();
  await expect(page.getByRole("tooltip")).toHaveText("Settings");
  // role="tooltip" is a visually hidden copy; measure the visible popper box
  await expectInsideViewport(
    page,
    page.locator("[data-radix-popper-content-wrapper]"),
  );
});

test("search tooltip shows the keyboard shortcut", async ({ page }) => {
  await nav(page).getByRole("button", { name: "Search", exact: true }).hover();
  await expect(page.getByRole("tooltip")).toHaveText(/Search\s*Ctrl\+K/);
});

test("keyboard focus shows the tooltip of a disabled icon", async ({
  page,
}) => {
  await nav(page).getByRole("button", { name: "Unpin all" }).focus();
  await expect(page.getByRole("tooltip")).toHaveText("Unpin all");
});

test("detail and bar icons have names and tooltips", async ({ page }) => {
  const headers = page.locator('[data-search-section="reqHeader"]');
  await headers.getByRole("button", { name: "Headers as plain text" }).hover();
  await expect(page.getByRole("tooltip")).toHaveText("Headers as plain text");

  await expect(
    headers.getByRole("button", { name: "Open MDN docs for Accept" }),
  ).toBeVisible();
  await expect(page.getByRole("button", { name: "URL details" })).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Clear filter" }),
  ).toHaveAttribute("aria-disabled", "true");
});
