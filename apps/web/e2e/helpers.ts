import fs from "node:fs";
import path from "node:path";
import {
  expect,
  type FileChooser,
  type Locator,
  type Page,
} from "@playwright/test";
import type { Har } from "@repo/har-types";

export const fixturePath = (name: string) =>
  path.join(__dirname, "fixtures", name);

export const readHar = (name: string): Har =>
  JSON.parse(fs.readFileSync(fixturePath(name), "utf-8")) as Har;

/** Opens the app and loads a file through the "Open HAR file" button. */
export async function openHar(page: Page, name = "basic.har") {
  await page.goto("/");
  await selectFile(page, fixturePath(name));
  await expect(page.locator('[data-row-id="0"]')).toBeVisible();
}

/** Clicks the start screen button and picks files in the file chooser. */
export async function selectFile(
  page: Page,
  files: Parameters<FileChooser["setFiles"]>[0],
) {
  const chooserPromise = page.waitForEvent("filechooser");
  await page.getByRole("button", { name: "Open HAR file" }).click();
  const chooser = await chooserPromise;
  await chooser.setFiles(files);
}

/** Header action icon, found by its iconify class name. */
export const headerIcon = (page: Page, icon: string) =>
  page.locator(`nav [role="button"].material-symbols--${icon}`);

export const listPanel = (page: Page) =>
  page.locator('div:has(+ [role="separator"])');

export const detailPanel = (page: Page) =>
  page.locator('[role="separator"] + div');

export const listRow = (page: Page, id: number) =>
  page.locator(`[data-row-id="${id}"]`);

/** Ids of the rendered list rows, in display order. */
export const rowIds = (page: Page) =>
  page
    .locator("[data-row-id]")
    .evaluateAll((rows) =>
      rows.map((row) => Number(row.getAttribute("data-row-id"))),
    );

export const filterPanel = (page: Page) =>
  page.locator("div:has(> div > div > input[type=text])");

export const filterInput = (page: Page, field: "url" | "status" | "method") =>
  filterPanel(page)
    .locator("input")
    .nth({ url: 0, status: 1, method: 2 }[field]);

export const sortingPanel = (page: Page) =>
  page.locator('div:has(> div:text-is("Sort by"))');

/** Detail section wrapper, e.g. "reqHeader", "resBody", "url". */
export const section = (page: Page, name: string): Locator =>
  page.locator(`[data-search-section="${name}"]`);

/** Content/headers formatter icon in a collapsible title bar. */
export const formatterIcon = (sectionLocator: Locator, icon: string) =>
  sectionLocator.locator(`div.material-symbols--${icon}`);

export const detailTab = (page: Page, name: string) =>
  detailPanel(page).getByRole("button", { name, exact: true });

/** Changes app settings through the settings modal. */
export async function setSettings(page: Page, values: Record<string, boolean>) {
  await headerIcon(page, "settings-outline-rounded").click();
  const dialog = page.getByRole("dialog", { name: "Settings" });
  for (const [label, checked] of Object.entries(values)) {
    const toggle = dialog.getByRole("switch", { name: label });
    if ((await toggle.getAttribute("aria-checked")) !== String(checked)) {
      await toggle.click();
    }
  }
  await dialog.getByRole("button", { name: "Save" }).click();
  await expect(dialog).toBeHidden();
}

export const hasSearchHighlight = (page: Page) =>
  page.evaluate(() => CSS.highlights.has("search-hit"));
