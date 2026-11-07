import fs from "node:fs";
import { test, expect } from "@playwright/test";
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
    await dropZone.dispatchEvent("dragenter", { dataTransfer });
    await expect(dropZone).toHaveClass(/border-accent-600/);
    await dropZone.dispatchEvent("drop", { dataTransfer });

    await expect(listRow(page, 0)).toBeVisible();
    await expect(page.locator("nav")).toContainText("dropped.har");
  });

  // Not possible yet: once a file is open, there is no way to open another one
  // and file tabs can not be switched.
  test.fixme("opens multiple files as tabs and switches between them", async () => {});

  // Not possible yet: closing a tab does not activate another open tab.
  test.fixme("closing a tab activates the next tab", async () => {});

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
