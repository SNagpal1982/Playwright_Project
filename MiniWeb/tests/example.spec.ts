import { test, expect } from '@playwright/test';
import path from 'path';
import fs from 'fs';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});

test.only("download", async ({ page }) => {
  const downloadsDir = path.join(process.cwd(), 'artifacts', 'downloads');
  fs.mkdirSync(downloadsDir, { recursive: true });

  await page.goto("https://qaplayground.dev/apps/download/");
    // Set up listener before the click
  const [download] = await Promise.all([
    page.waitForEvent('download'),
    page.click("[download='sample']"), // This should trigger the download
  ]);
  // await page.locator("[download='sample']").click();
  // await page.pause();
    // Inspect filename suggested by the server
  const suggested = download.suggestedFilename();
  const filePath = path.join(downloadsDir, suggested);

  console.log("filePath : " + filePath);

  // Save explicitly to your folder
  await download.saveAs(filePath);

  // Optional: verify the file is there
  expect(fs.existsSync(filePath)).toBeTruthy();
  console.log('Saved at:', filePath);
});