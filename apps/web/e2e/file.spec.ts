import fs from "node:fs";
import { test, expect, type Page } from "@playwright/test";
import { fixturePath, listRow, openHar, selectFile } from "./helpers";

const footer = "#footer";

test.describe("file handling", () => {
  test("opens HAR via the button and shows list and footer", async ({
    page,
  }) => {
    await openHar(page);

    await expect(page.locator("[data-row-id]")).toHaveCount(6);
    const size = fs.statSync(fixturePath("basic.har")).size;
    await expect(page.locator(footer)).toContainText("Entries: 6");
    await expect(page.locator(footer)).toContainText("Total time: 1.02 s");
    const sizeText = String(size).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    await expect(page.locator(footer)).toContainText(`(${sizeText} B)`);
    await expect(page.locator(footer)).toContainText("HAR: v1.2");
    await expect(page.locator(footer)).toContainText(
      "Creator: E2E Fixture 1.0",
    );
    await expect(page.locator("nav")).toContainText("basic.har");
  });

  test("opens HAR via drag and drop", async ({ page }) => {
    await page.goto("/");
    const content = fs.readFileSync(fixturePath("basic.har"), "utf-8");
    const dataTransfer = await page.evaluateHandle((text) => {
      const transfer = new DataTransfer();
      transfer.items.add(
        new File([text], "dropped.har", { type: "application/json" }),
      );
      return transfer;
    }, content);
    const dropZone = page.locator("div.border-dashed");
    // Drag listeners are attached after React hydrates, so an early dragenter
    // can be lost. Repeat it until the drop zone is highlighted.
    await expect(async () => {
      await dropZone.dispatchEvent("dragenter", { dataTransfer });
      await expect(dropZone).toHaveClass(/border-accent-600/, {
        timeout: 500,
      });
    }).toPass();
    await dropZone.dispatchEvent("drop", { dataTransfer });

    await expect(listRow(page, 0)).toBeVisible();
    await expect(page.locator("nav")).toContainText("dropped.har");
  });

  test.describe("with two open files", () => {
    const fileTab = (page: Page, name: string) =>
      page
        .locator("nav div:has(> span > .material-symbols--close-rounded)")
        .filter({ hasText: name });

    const closeTab = (page: Page, name: string) =>
      fileTab(page, name).locator(".material-symbols--close-rounded").click();

    // There is no "open" action once a file with entries is shown yet (#123).
    // An empty HAR keeps the start screen, so a second file can be opened.
    test.beforeEach(async ({ page }) => {
      await page.goto("/");
      await selectFile(page, fixturePath("empty.har"));
      await expect(fileTab(page, "empty.har")).toBeVisible();
      await selectFile(page, fixturePath("basic.har"));
      await expect(listRow(page, 0)).toBeVisible();
      await expect(fileTab(page, "basic.har")).toBeVisible();
    });

    test("clicking a tab switches the file", async ({ page }) => {
      await fileTab(page, "empty.har").click();
      await expect(page.locator(footer)).toContainText("Entries: 0");
      await expect(page.getByText("Drop HAR file here")).toBeVisible();

      await fileTab(page, "basic.har").click();
      await expect(page.locator(footer)).toContainText("Entries: 6");
      await expect(page.locator("[data-row-id]")).toHaveCount(6);
    });

    test("closing the active tab selects the previous file", async ({
      page,
    }) => {
      await closeTab(page, "basic.har");

      await expect(fileTab(page, "basic.har")).toHaveCount(0);
      await expect(fileTab(page, "empty.har")).toBeVisible();
      await expect(page.locator(footer)).toContainText("Entries: 0");
    });

    test("closing the first active tab selects the next file", async ({
      page,
    }) => {
      await fileTab(page, "empty.har").click();
      await expect(page.locator(footer)).toContainText("Entries: 0");

      await closeTab(page, "empty.har");

      await expect(fileTab(page, "empty.har")).toHaveCount(0);
      await expect(page.locator(footer)).toContainText("Entries: 6");
      await expect(listRow(page, 0)).toBeVisible();
    });

    test("closing an inactive tab keeps the active file", async ({ page }) => {
      await closeTab(page, "empty.har");

      await expect(fileTab(page, "empty.har")).toHaveCount(0);
      await expect(page.locator(footer)).toContainText("Entries: 6");
    });
  });

  test("closing the last tab shows the start screen", async ({ page }) => {
    await openHar(page);
    await page
      .locator("nav .material-symbols--close-rounded")
      .locator("visible=true")
      .click();

    await expect(page.getByText("Drop HAR file here")).toBeVisible();
    await expect(page.locator("nav")).not.toContainText("basic.har");
    await expect(page.locator(footer)).toHaveText("Open HAR file");
  });

  test("wrong file type shows error toast and app stays usable", async ({
    page,
  }) => {
    await page.goto("/");
    await selectFile(page, fixturePath("notes.txt"));
    await expect(page.getByText("could not be opened")).toBeVisible();
    await expect(page.getByText("invalid HAR format")).toBeVisible();

    await selectFile(page, fixturePath("basic.har"));
    await expect(listRow(page, 0)).toBeVisible();
  });

  test("invalid JSON shows error toast", async ({ page }) => {
    await page.goto("/");
    await selectFile(page, fixturePath("invalid.har"));
    await expect(page.getByText("invalid.har")).toBeVisible();
    await expect(page.getByText("invalid HAR format")).toBeVisible();
    await expect(page.getByText("Drop HAR file here")).toBeVisible();
  });

  test("corrupted HAR shows error toast with reason", async ({ page }) => {
    await page.goto("/");
    await selectFile(page, fixturePath("corrupted.har"));
    await expect(page.getByText("Wrong or disrupted content.")).toBeVisible();
    await expect(page.locator("nav")).not.toContainText("corrupted.har");
  });

  test("empty HAR does not crash", async ({ page }) => {
    const errors: Error[] = [];
    page.on("pageerror", (error) => errors.push(error));
    await page.goto("/");
    await selectFile(page, fixturePath("empty.har"));

    await expect(page.locator(footer)).toContainText("Entries: 0");
    await expect(page.locator("nav")).toContainText("empty.har");
    await expect(page.locator("[data-row-id]")).toHaveCount(0);
    await expect(page.getByText("Drop HAR file here")).toBeVisible();
    expect(errors).toEqual([]);
  });
});
