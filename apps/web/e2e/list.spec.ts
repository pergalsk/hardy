import { test, expect, type Page } from "@playwright/test";
import {
  detailPanel,
  filterInput,
  filterPanel,
  headerIcon,
  listRow,
  openHar,
  readHar,
  rowIds,
  setSettings,
  sortingPanel,
} from "./helpers";

const entries = readHar("basic.har").log.entries;

const footer = (page: Page) => page.locator("#footer");

test.beforeEach(async ({ page }) => {
  await openHar(page);
});

test.describe("list", () => {
  test("click entry selects it and shows it in detail", async ({ page }) => {
    await expect(listRow(page, 0)).toHaveClass(/border-accent-500/);

    await listRow(page, 1).click();
    await expect(listRow(page, 1)).toHaveClass(/border-accent-500/);
    await expect(listRow(page, 0)).not.toHaveClass(/border-accent-500/);
    await expect(detailPanel(page)).toContainText(
      "https://api.example.com/login",
    );
  });

  test("error entries have red style", async ({ page }) => {
    await expect(listRow(page, 2)).toHaveClass(/bg-\[#ff000013\]/);
    await expect(listRow(page, 3)).toHaveClass(/bg-\[#ff000013\]/);
    await expect(listRow(page, 1)).not.toHaveClass(/bg-\[#ff000013\]/);
  });

  test.describe("filter", () => {
    test("by url", async ({ page }) => {
      await filterInput(page, "url").fill("users");
      expect(await rowIds(page)).toEqual([0]);
      await expect(footer(page)).toContainText("(filtered: 1)");
    });

    test("by status", async ({ page }) => {
      await filterInput(page, "status").fill("404");
      expect(await rowIds(page)).toEqual([2]);
    });

    test("by method, case-insensitive", async ({ page }) => {
      await filterInput(page, "method").fill("post");
      expect(await rowIds(page)).toEqual([1, 5]);
    });

    test("multiple words are combined with AND", async ({ page }) => {
      await filterInput(page, "url").fill("API.example items");
      expect(await rowIds(page)).toEqual([3]);
    });

    test("-word excludes matches", async ({ page }) => {
      await filterInput(page, "url").fill("-api");
      expect(await rowIds(page)).toEqual([2, 4]);
    });

    test("clear button resets all fields", async ({ page }) => {
      await filterInput(page, "url").fill("example");
      await filterInput(page, "status").fill("200");
      await filterInput(page, "method").fill("get");
      expect(await rowIds(page)).toEqual([0, 4]);

      await filterPanel(page).getByRole("button").click();
      for (const field of ["url", "status", "method"] as const) {
        await expect(filterInput(page, field)).toHaveValue("");
      }
      await expect(page.locator("[data-row-id]")).toHaveCount(6);
    });

    test("header toggle hides panel and clears filter", async ({ page }) => {
      await filterInput(page, "url").fill("users");
      await headerIcon(page, "filter-alt-outline").click();

      await expect(filterPanel(page)).toBeHidden();
      await expect(page.locator("[data-row-id]")).toHaveCount(6);
      await expect(footer(page)).not.toContainText("filtered");

      await headerIcon(page, "filter-alt-outline").click();
      await expect(filterInput(page, "url")).toHaveValue("");
    });
  });

  test.describe("hidden items", () => {
    test("group hidden items collapses them into a group with count", async ({
      page,
    }) => {
      await filterInput(page, "url").fill("users");
      const group = page.getByText("Hidden: 5");
      await expect(group).toBeVisible();
      expect(await rowIds(page)).toEqual([0]);

      await group.click();
      expect(await rowIds(page)).toEqual([0, 1, 2, 3, 4, 5]);
      await expect(listRow(page, 1)).toHaveClass(/opacity-20/);
    });

    test("without grouping, hidden items are shown faded", async ({ page }) => {
      await setSettings(page, { "Group Hidden Items": false });
      await filterInput(page, "url").fill("users");

      await expect(page.getByText("Hidden: 5")).toBeHidden();
      expect(await rowIds(page)).toEqual([0, 1, 2, 3, 4, 5]);
      await expect(listRow(page, 1)).toHaveClass(/opacity-20/);
    });

    test("exclude hidden items removes them from the list", async ({
      page,
    }) => {
      await setSettings(page, { "Exclude Hidden Items": true });
      await filterInput(page, "url").fill("users");

      await expect(page.getByText(/Hidden: \d+/)).toBeHidden();
      expect(await rowIds(page)).toEqual([0]);
    });
  });

  test.describe("sorting", () => {
    type Field = "url" | "status" | "method" | "time" | "pageref";
    const fieldValue = (field: Field, id: number) => {
      const entry = entries[id]!;
      return {
        url: entry.request.url,
        status: entry.response.status,
        method: entry.request.method,
        time: entry.time,
        pageref: entry.pageref ?? "",
      }[field];
    };
    // same stable sort as the app: numbers for time/status, lowercase text otherwise
    const expectedOrder = (field: Field, dir: "asc" | "desc") =>
      entries
        .map((_, id) => id)
        .sort((a, b) => {
          const va = fieldValue(field, a);
          const vb = fieldValue(field, b);
          const cmp =
            typeof va === "number" && typeof vb === "number"
              ? va - vb
              : String(va)
                  .toLowerCase()
                  .localeCompare(String(vb).toLowerCase());
          return (dir === "asc" ? cmp : -cmp) || a - b;
        });

    const labels: Record<Field, string> = {
      url: "URL",
      status: "Status",
      method: "Method",
      time: "Time",
      pageref: "Page",
    };

    test.beforeEach(async ({ page }) => {
      await headerIcon(page, "sort-rounded").click();
      await expect(sortingPanel(page)).toBeVisible();
    });

    for (const field of Object.keys(labels) as Field[]) {
      test(`by ${field} asc and desc`, async ({ page }) => {
        const button = sortingPanel(page).getByRole("button", {
          name: labels[field],
          exact: true,
        });
        await button.click();
        expect(await rowIds(page)).toEqual(expectedOrder(field, "asc"));
        await button.click();
        expect(await rowIds(page)).toEqual(expectedOrder(field, "desc"));
      });
    }

    test("reset sorting restores original order", async ({ page }) => {
      await sortingPanel(page)
        .getByRole("button", { name: "Time", exact: true })
        .click();
      expect(await rowIds(page)).not.toEqual([0, 1, 2, 3, 4, 5]);

      await sortingPanel(page)
        .locator("button:has(.material-symbols--delete-outline-rounded)")
        .click();
      expect(await rowIds(page)).toEqual([0, 1, 2, 3, 4, 5]);
    });

    test("sort inside pages keeps page groups", async ({ page }) => {
      await headerIcon(page, "note-stack-outline").click();
      await sortingPanel(page)
        .getByRole("button", { name: "Time", exact: true })
        .click();
      // sorted across pages, so groups are split: [2] [5, 4] [0, 1] [3]
      expect(await rowIds(page)).toEqual([2, 5, 4, 0, 1, 3]);
      await expect(page.getByText("page_2", { exact: true })).toHaveCount(2);

      await sortingPanel(page).getByRole("switch").click();
      expect(await rowIds(page)).toEqual([0, 1, 2, 3, 5, 4]);
      await expect(page.getByText("page_2", { exact: true })).toHaveCount(1);
    });
  });

  test.describe("pages", () => {
    test("pages toggle groups entries by pageref", async ({ page }) => {
      await headerIcon(page, "note-stack-outline").click();
      for (const pageref of ["page_1", "page_2", "page_3"]) {
        await expect(page.getByText(pageref, { exact: true })).toBeVisible();
      }
      await expect(page.getByText("/gallery")).toBeVisible();

      await page.getByText("page_1", { exact: true }).click();
      await expect(listRow(page, 0)).toBeHidden();
      await expect(listRow(page, 2)).toBeVisible();

      await headerIcon(page, "note-stack-outline").click();
      await expect(page.getByText("page_1", { exact: true })).toBeHidden();
    });

    test("exclude empty pages hides pages without visible entries", async ({
      page,
    }) => {
      await headerIcon(page, "note-stack-outline").click();
      await filterInput(page, "url").fill("users");
      await expect(page.getByText("page_1", { exact: true })).toBeVisible();
      await expect(page.getByText("page_2", { exact: true })).toBeHidden();

      await setSettings(page, { "Exclude Empty Pages": false });
      await expect(page.getByText("page_2", { exact: true })).toBeVisible();
      await expect(page.getByText("page_3", { exact: true })).toBeVisible();
    });
  });

  test.describe("pinning", () => {
    const pinIcon = (page: Page, id: number) =>
      listRow(page, id).locator(
        ".material-symbols--bookmark-outline-rounded, .material-symbols--bookmark-check-rounded",
      );
    const showPinned = (page: Page) =>
      page.locator(
        'nav [role="button"]:is(.material-symbols--bookmarks-outline, .material-symbols--bookmarks-rounded)',
      );
    const clearPinned = (page: Page) =>
      headerIcon(page, "bookmark-remove-outline-rounded");

    test("buttons are disabled when nothing is pinned", async ({ page }) => {
      await expect(showPinned(page)).toHaveClass(/pointer-events-none/);
      await expect(clearPinned(page)).toHaveClass(/pointer-events-none/);
    });

    test("pin, show pinned only, unpin and clear", async ({ page }) => {
      await pinIcon(page, 1).click();
      await pinIcon(page, 3).click();
      await expect(pinIcon(page, 1)).toHaveClass(/bookmark-check-rounded/);
      await expect(listRow(page, 1)).toHaveClass(/pinned-overlay/);
      await expect(showPinned(page)).not.toHaveClass(/pointer-events-none/);

      await showPinned(page).click();
      expect(await rowIds(page)).toEqual([1, 3]);

      await pinIcon(page, 3).click();
      expect(await rowIds(page)).toEqual([1]);

      await clearPinned(page).click();
      expect(await rowIds(page)).toEqual([0, 1, 2, 3, 4, 5]);
      await expect(pinIcon(page, 1)).toHaveClass(/bookmark-outline-rounded/);
      await expect(clearPinned(page)).toHaveClass(/pointer-events-none/);
    });
  });

  test("settings persist after page reload", async ({ page }) => {
    await setSettings(page, {
      "Group Hidden Items": false,
      "Exclude Hidden Items": true,
    });
    await headerIcon(page, "note-stack-outline").click();

    await page.reload();
    await headerIcon(page, "settings-outline-rounded").click();
    const dialog = page.getByRole("dialog", { name: "Settings" });
    await expect(
      dialog.getByRole("switch", { name: "Group Hidden Items" }),
    ).toHaveAttribute("aria-checked", "false");
    await expect(
      dialog.getByRole("switch", { name: "Exclude Hidden Items" }),
    ).toHaveAttribute("aria-checked", "true");
    await dialog.getByRole("button", { name: "Cancel" }).click();

    await openHar(page);
    await expect(page.getByText("page_1", { exact: true })).toBeVisible();
  });
});
