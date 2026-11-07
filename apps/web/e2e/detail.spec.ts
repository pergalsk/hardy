import { test, expect, type Page } from "@playwright/test";
import {
  detailPanel,
  detailTab,
  formatterIcon,
  headerIcon,
  listRow,
  openHar,
  section,
} from "./helpers";

const commonPanel = (page: Page) =>
  page.locator('div:has(> div > div[data-search-section="url"])');

test.beforeEach(async ({ page }) => {
  await openHar(page);
});

test.describe("detail", () => {
  test("common panel shows entry fields", async ({ page }) => {
    const common = commonPanel(page);
    await expect(common).toContainText("URL:");
    await expect(common).toContainText(
      "https://api.example.com/users?page=2&limit=10",
    );
    await expect(common).toContainText("Method:GET");
    await expect(common).toContainText("Status:200OK");
    await expect(common).toContainText("HTTP version:HTTP/2.0");
    await expect(common).toContainText("Security state:secure");
    await expect(common).toContainText("Time:100.00 ms");
    await expect(common).toContainText("Server IP:93.184.216.34");
  });

  test("long URL expands and collapses", async ({ page }) => {
    await listRow(page, 4).click();
    const common = commonPanel(page);
    await common.getByRole("button", { name: "...More" }).click();
    await expect(common.getByRole("button", { name: "...Less" })).toBeVisible();
    await common.getByRole("button", { name: "...Less" }).click();
    await expect(common.getByRole("button", { name: "...More" })).toBeVisible();
  });

  test.describe("URL details modal", () => {
    const dialog = (page: Page) =>
      page.getByRole("dialog", { name: "URL details" });
    const open = async (page: Page) => {
      await page.getByTitle("Show URL details").click();
      await expect(dialog(page)).toBeVisible();
    };

    test("shows query params and closes via X", async ({ page }) => {
      await open(page);
      await expect(dialog(page)).toContainText("api.example.com");
      await expect(dialog(page)).toContainText("page= 2");
      await expect(dialog(page)).toContainText("limit= 10");
      await dialog(page).getByRole("button", { name: "Close" }).click();
      await expect(dialog(page)).toBeHidden();
    });

    test("closes via Esc", async ({ page }) => {
      await open(page);
      await page.keyboard.press("Escape");
      await expect(dialog(page)).toBeHidden();
    });

    test("closes via backdrop click", async ({ page }) => {
      await open(page);
      await page.mouse.click(5, 5);
      await expect(dialog(page)).toBeHidden();
    });
  });

  test("tabs switch content", async ({ page }) => {
    await expect(section(page, "reqHeader")).toBeVisible();

    await detailTab(page, "Response").click();
    await expect(section(page, "resHeader")).toContainText("X-Request-Id");

    await detailTab(page, "Cookies").click();
    await expect(section(page, "reqCookie")).toBeVisible();

    await detailTab(page, "Timing").click();
    await expect(detailPanel(page)).toContainText("Total request time");

    await detailTab(page, "Request").click();
    await expect(section(page, "reqHeader")).toBeVisible();
  });

  test("headers formatters: table, plain, raw", async ({ page }) => {
    const headers = section(page, "reqHeader");
    await expect(headers.locator("table")).toContainText("Accept");

    await formatterIcon(headers, "format-align-left-rounded").click();
    await expect(headers.locator("table")).toHaveCount(0);
    await expect(headers).toContainText("Accept: application/json");

    await formatterIcon(headers, "code-rounded").click();
    await expect(headers).toContainText('"name"');
    await expect(headers).toContainText('"Accept"');

    await formatterIcon(headers, "notes-rounded").click();
    await expect(headers.locator("table")).toBeVisible();
  });

  test("User-Agent header: parsed vs raw", async ({ page }) => {
    const row = section(page, "reqHeader").locator("tr", {
      hasText: "User-Agent",
    });
    await expect(row).toContainText("Browser");
    await expect(row).toContainText("Chrome 120");
    await expect(row).not.toContainText("Mozilla/5.0");

    await row.hover();
    await row.locator(".material-symbols--code-rounded").click();
    await expect(row).toContainText("Mozilla/5.0 (Windows NT 10.0");

    await row.hover();
    await row.locator(".material-symbols--notes-rounded").click();
    await expect(row).toContainText("Chrome 120");
  });

  test("content: JSON pretty vs raw", async ({ page }) => {
    await detailTab(page, "Response").click();
    const raw = '{"users":[{"id":1,"name":"Alice"}],"total":1}';
    const body = section(page, "resBody");
    await expect(body).toContainText("application/json");
    await expect(body).toContainText("users");
    await expect(body).not.toContainText(raw);

    await formatterIcon(body, "code-rounded").click();
    await expect(body).toContainText(raw);

    await formatterIcon(body, "notes-rounded").click();
    await expect(body).not.toContainText(raw);
  });

  test("content: JSON tree collapse and expand", async ({ page }) => {
    await detailTab(page, "Response").click();
    const body = section(page, "resBody");
    // tree arrows: 0 = root, 1 = "users" array, 2 = first user object
    const arrows = body.locator("svg");
    await expect(body).toContainText("{...}");
    await expect(body).not.toContainText("Alice");

    await arrows.nth(2).click();
    await expect(body).toContainText("Alice");

    await arrows.nth(1).click();
    await expect(body).not.toContainText("Alice");
    await expect(body).not.toContainText("{...}");
    // expanding the array again shows the user object collapsed
    await arrows.nth(1).click();
    await expect(body).toContainText("{...}");
  });

  test("content: plain text body and no content", async ({ page }) => {
    await listRow(page, 1).click();
    await detailTab(page, "Response").click();
    await expect(section(page, "resBody")).toContainText("Welcome bob");

    await listRow(page, 2).click();
    await expect(section(page, "resBody")).toContainText("No data");
  });

  test("collapsible sections open and close; disabled without data", async ({
    page,
  }) => {
    const headers = section(page, "reqHeader");
    await headers.getByText("Headers", { exact: true }).click();
    await expect(headers.locator("table")).toHaveCount(0);
    await headers.getByText("Headers", { exact: true }).click();
    await expect(headers.locator("table")).toBeVisible();

    await listRow(page, 2).click();
    await detailTab(page, "Response").click();
    const body = section(page, "resBody");
    await body.getByText("Content", { exact: true }).click();
    await expect(body.locator(".pt-2")).toHaveCount(0);
  });

  test("cookies tab shows request and response cookies", async ({ page }) => {
    await detailTab(page, "Cookies").click();
    await expect(section(page, "reqCookie").locator("tbody")).toContainText(
      "session",
    );
    await expect(section(page, "reqCookie").locator("tbody")).toContainText(
      "abc123",
    );
    await expect(section(page, "resCookie").locator("tbody")).toContainText(
      "theme",
    );
    await expect(section(page, "resCookie").locator("tbody")).toContainText(
      "dark",
    );

    await listRow(page, 2).click();
    await expect(section(page, "reqCookie")).toContainText("No data");
    await expect(section(page, "resCookie")).toContainText("No data");
  });

  test("timing tab shows bar and table values", async ({ page }) => {
    await detailTab(page, "Timing").click();
    const detail = detailPanel(page);
    await expect(detail).toContainText("Total request time: 100.00 ms");
    const table = detail.locator("table");
    await expect(table.locator('tr:has(td:text-is("Wait"))')).toContainText(
      "50.00 ms",
    );
    await expect(table.locator('tr:has(td:text-is("Wait"))')).toContainText(
      "50.0%",
    );
    await expect(table.locator('tr:has(td:text-is("DNS"))')).toContainText(
      "10.00 ms",
    );
  });

  test("detail raw formatter shows the whole entry as JSON", async ({
    page,
  }) => {
    await headerIcon(page, "code-blocks-outline-rounded").click();
    await expect(detailTab(page, "Request")).toBeHidden();
    await expect(detailPanel(page)).toContainText("startedDateTime");
    await expect(detailPanel(page)).not.toContainText("$$id");

    await headerIcon(page, "table-rows-outline").click();
    await expect(detailTab(page, "Request")).toBeVisible();
  });

  test("error status uses error colors only for 4xx/5xx", async ({ page }) => {
    const errorBg = /bg-\[#ffeded\]/;
    await expect(commonPanel(page)).not.toHaveClass(errorBg);

    await listRow(page, 2).click();
    await expect(commonPanel(page)).toHaveClass(errorBg);

    await listRow(page, 3).click();
    await expect(commonPanel(page)).toHaveClass(errorBg);

    await listRow(page, 1).click();
    await expect(commonPanel(page)).not.toHaveClass(errorBg);
  });
});
