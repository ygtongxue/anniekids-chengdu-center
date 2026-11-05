const { test, expect } = require('@playwright/test');
const fs = require('node:fs');
// External images/fonts are outside this repository's test boundary.
test.beforeEach(async ({ page }) => {
 await page.route('**/*', route => {
  const u = new URL(route.request().url());
  return u.hostname === '127.0.0.1' ? route.continue() : route.abort();
 });
});
for (const file of fs.readdirSync('.').filter(f => f.endsWith('.html'))) {
 test(`${file} renders and navigation works`, async ({ page, isMobile }) => {
  const errors = []; page.on('pageerror', e => errors.push(e.message));
  const response = await page.goto(`/${file}`);
  expect(response.status()).toBe(200);
  await expect(page.locator('h1')).toBeVisible();
  await expect(page.locator('#mainNav')).toHaveCount(1);
  if (isMobile) {
   const button = page.locator('#navToggle');
   await button.click(); await expect(button).toHaveAttribute('aria-expanded', 'true');
   await expect(page.locator('#mainNav')).toHaveClass(/open/);
   await button.click(); await expect(button).toHaveAttribute('aria-expanded', 'false');
  }
  await expect(page.locator('#mainNav a').first()).toHaveAttribute('href','index.html');
  if (isMobile) await page.locator('#navToggle').click();
  await page.locator('#mainNav a').first().click();
  await expect(page).toHaveURL(/\/index\.html$/);
  expect(errors).toEqual([]);
 });
}
