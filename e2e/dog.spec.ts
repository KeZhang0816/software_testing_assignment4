import { test, expect } from "@playwright/test";

test.describe("Dog Image E2E Tests", () => {

  test("Dog image is loaded when page opens", async ({ page }) => {
    await page.goto("http://localhost:5173");
    await page.waitForResponse(response =>
      response.url().includes("/api/dogs/random") && response.status() === 200
    );

    const image = page.locator("img");
    const src = await image.getAttribute("src");
    expect(src).toBeTruthy();
    expect(src).toMatch(/^https:\/\//);

  });

  test("Dog image is loaded when button is clicked", async ({ page }) => {

    await page.goto("http://localhost:5173");
    await page.waitForResponse(response =>
      response.url().includes("/api/dogs/random") && response.status() === 200
    );
    await page.click("button");
    await page.waitForResponse(response =>
      response.url().includes("/api/dogs/random") && response.status() === 200
    );

    const image = page.locator("img");
    const src = await image.getAttribute("src");

    expect(src).toBeTruthy();
    expect(src).toMatch(/^https:\/\//);

  });


  test("Error message shown when API request fails", async ({ page }) => {
    await page.route("**/api/dogs/random", route => route.abort());
    await page.goto("http://localhost:5173");
    const errorElement = page.locator("text=/error/i");
    await expect(errorElement).toBeVisible();
  });
});