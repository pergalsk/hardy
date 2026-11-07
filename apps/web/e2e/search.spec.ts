import { test, expect, type Page } from "@playwright/test";
import {
  detailTab,
  filterInput,
  formatterIcon,
  hasSearchHighlight,
  headerIcon,
  listRow,
  openHar,
  section,
} from "./helpers";

const dialog = (page: Page) => page.getByRole("dialog", { name: "Search" });
const input = (page: Page) =>
  dialog(page).getByRole("textbox", { name: "Search" });

async function search(page: Page, query: string) {
  await page.keyboard.press("Control+k");
  await input(page).fill(query);
}

const result = (page: Page, sectionTitle: string) =>
  dialog(page).getByRole("button", { name: sectionTitle });

test.beforeEach(async ({ page }) => {
  await openHar(page);
});

test.describe("global search", () => {
  for (const shortcut of ["Control+k", "Control+Shift+F"]) {
    test(`${shortcut} opens modal with focused input`, async ({ page }) => {
      await page.keyboard.press(shortcut);
      await expect(dialog(page)).toBeVisible();
      await expect(input(page)).toBeFocused();
    });
  }

  test("header button opens modal; Esc and X close it", async ({ page }) => {
    await headerIcon(page, "search-rounded").click();
    await expect(input(page)).toBeFocused();
    await page.keyboard.press("Escape");
    await expect(dialog(page)).toBeHidden();

    await headerIcon(page, "search-rounded").click();
    await dialog(page).getByRole("button", { name: "Close" }).click();
    await expect(dialog(page)).toBeHidden();
  });

  test("results are grouped by entry with highlighted match and count", async ({
    page,
  }) => {
    await search(page, "example.com");
    await expect(dialog(page)).toContainText("results in 6 entries");
    await expect(dialog(page).locator("mark").first()).toHaveText(
      "example.com",
    );

    await input(page).fill("ALICE");
    await expect(dialog(page)).toContainText("1 results in 1 entries");
    await expect(dialog(page).locator("mark")).toHaveText("Alice");

    await input(page).fill("zzz-not-there");
    await expect(dialog(page)).toContainText("No results");
  });

  const sections: [string, string][] = [
    ["logo.png", "URL"],
    ["Mozilla/5.0", "Request header"],
    ["req-777", "Response header"],
    ["theme=dark", "Response cookie"],
    ["session=abc123", "Request cookie"],
    ["password=secret", "Request body"],
    ["field2=value2", "Request body"],
    ["Welcome bob", "Response body"],
  ];
  for (const [query, sectionTitle] of sections) {
    test(`finds "${query}" in ${sectionTitle}`, async ({ page }) => {
      await search(page, query);
      await expect(result(page, sectionTitle).first()).toBeVisible();
      await expect(
        result(page, sectionTitle).first().locator("mark"),
      ).toHaveText(query);
    });
  }

  test("click result selects entry, switches tab and highlights match", async ({
    page,
  }) => {
    await search(page, "boom");
    await result(page, "Response body").click();

    await expect(dialog(page)).toBeHidden();
    await expect(listRow(page, 3)).toHaveClass(/border-red-400/);
    await expect(section(page, "resBody")).toContainText("boom");
    await expect.poll(() => hasSearchHighlight(page)).toBe(true);
  });

  test("JSON body match switches content to raw formatter", async ({
    page,
  }) => {
    await search(page, "Alice");
    await result(page, "Response body").click();

    const body = section(page, "resBody");
    await expect(formatterIcon(body, "code-rounded")).toHaveClass(
      /text-accent-600/,
    );
    await expect(body).toContainText('"name":"Alice"');
  });

  test("detail raw mode switches back to tab view on jump", async ({
    page,
  }) => {
    await headerIcon(page, "code-blocks-outline-rounded").click();
    await expect(detailTab(page, "Request")).toBeHidden();

    await search(page, "req-777");
    await result(page, "Response header").click();
    await expect(detailTab(page, "Request")).toBeVisible();
    await expect(section(page, "resHeader")).toBeVisible();
  });

  test.describe("entry hidden by filter", () => {
    test.beforeEach(async ({ page }) => {
      await filterInput(page, "url").fill("login");
      await search(page, "Alice");
      await result(page, "Response body").click();
      await expect(dialog(page)).toContainText(
        "This entry is hidden by the filter",
      );
    });

    test("Cancel keeps state", async ({ page }) => {
      await dialog(page).getByRole("button", { name: "Cancel" }).click();
      await expect(dialog(page)).not.toContainText(
        "This entry is hidden by the filter",
      );
      await expect(dialog(page)).toBeVisible();
      await page.keyboard.press("Escape");
      await expect(filterInput(page, "url")).toHaveValue("login");
      await expect(listRow(page, 0)).toBeHidden();
    });

    test("Clear filter opens entry", async ({ page }) => {
      await dialog(page).getByRole("button", { name: "Clear filter" }).click();
      await expect(dialog(page)).toBeHidden();
      await expect(filterInput(page, "url")).toHaveValue("");
      await expect(listRow(page, 0)).toHaveClass(/border-accent-500/);
      await expect(section(page, "resBody")).toBeVisible();
    });
  });

  test("manual tab or row change removes highlight", async ({ page }) => {
    await search(page, "req-777");
    await result(page, "Response header").click();
    await expect.poll(() => hasSearchHighlight(page)).toBe(true);
    await detailTab(page, "Request").click();
    await expect.poll(() => hasSearchHighlight(page)).toBe(false);

    await search(page, "req-777");
    await result(page, "Response header").click();
    await expect.poll(() => hasSearchHighlight(page)).toBe(true);
    await listRow(page, 1).click();
    await expect.poll(() => hasSearchHighlight(page)).toBe(false);
  });

  // Not possible yet: a second file can not be opened.
  test.fixme("searches only in the current file", async () => {});
});
