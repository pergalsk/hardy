import { test, expect } from "@playwright/test";
import {
  fixturePath,
  listPanel,
  listRow,
  openHar,
  readHar,
  selectFile,
} from "./helpers";

test.describe("layout and UI", () => {
  test("split panel resizes by dragging the divider", async ({ page }) => {
    await openHar(page);
    const divider = page.locator("[role=separator]");
    const before = (await listPanel(page).boundingBox())!.width;
    const box = (await divider.boundingBox())!;

    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
    await page.mouse.down();
    await page.mouse.move(box.x - 200, box.y + box.height / 2, { steps: 5 });
    await page.mouse.up();
    const after = (await listPanel(page).boundingBox())!.width;
    expect(after).toBeLessThan(before - 150);

    await divider.dblclick();
    await expect
      .poll(async () => (await listPanel(page).boundingBox())!.width)
      .toBeCloseTo(before, -1);
  });

  for (const colorScheme of ["light", "dark"] as const) {
    test(`${colorScheme} mode renders key screens`, async ({ page }) => {
      await page.emulateMedia({ colorScheme });
      await page.goto("/");
      // average RGB of the app background, 0 (black) - 255 (white)
      const brightness = await page.locator("div.h-screen").evaluate((el) => {
        const ctx = document.createElement("canvas").getContext("2d")!;
        ctx.fillStyle = getComputedStyle(el).backgroundColor;
        ctx.fillRect(0, 0, 1, 1);
        const [r = 0, g = 0, b = 0] = ctx.getImageData(0, 0, 1, 1).data;
        return (r + g + b) / 3;
      });
      if (colorScheme === "dark") expect(brightness).toBeLessThan(80);
      else expect(brightness).toBeGreaterThan(200);
      await expect(page.getByText("Drop HAR file here")).toBeVisible();

      await selectFile(page, fixturePath("basic.har"));
      await expect(listRow(page, 0)).toBeVisible();
      await expect(page.locator("#footer")).toContainText("Entries: 6");
    });
  }

  test("toasts appear and can be closed", async ({ page }) => {
    await page.goto("/");
    await selectFile(page, fixturePath("invalid.har"));
    const toast = page.locator("div.shadow-xl", {
      hasText: "could not be opened",
    });
    await expect(toast).toBeVisible();

    await toast.locator(".material-symbols--close-rounded").click();
    await expect(toast).toBeHidden();
  });

  test("large HAR opens and search stays responsive", async ({ page }) => {
    test.slow();
    const har = readHar("basic.har");
    const template = har.log.entries[0]!;
    const body = JSON.stringify({ items: "x".repeat(4000) });
    har.log.entries = Array.from({ length: 3000 }, (_, i) => ({
      ...template,
      request: {
        ...template.request,
        url: `https://api.example.com/items/${i}`,
      },
      response: {
        ...template.response,
        content: { ...template.response.content, text: body },
      },
    }));
    har.log.entries[2999]!.request.url =
      "https://api.example.com/needle-in-haystack";
    const buffer = Buffer.from(JSON.stringify(har));
    expect(buffer.length).toBeGreaterThan(10 * 1024 * 1024);

    await page.goto("/");
    await selectFile(page, {
      name: "large.har",
      mimeType: "application/json",
      buffer,
    });
    await expect(listRow(page, 2999)).toBeAttached({ timeout: 30_000 });
    await expect(page.locator("#footer")).toContainText("Entries: 3000");

    await page.keyboard.press("Control+k");
    const dialog = page.getByRole("dialog", { name: "Search" });
    const started = Date.now();
    await dialog
      .getByRole("textbox", { name: "Search" })
      .fill("needle-in-haystack");
    await expect(dialog).toContainText("1 results in 1 entries");
    expect(Date.now() - started).toBeLessThan(5_000);
  });
});
