import { test, expect } from '@playwright/test';

test('cartan-newton-orbiting-lab post loads and has no console errors', async ({ page }) => {
  const consoleErrors: string[] = [];
  const pageErrors: Error[] = [];
  page.on('console', msg => {
    if (msg.type() === 'error' && !msg.text().includes('ERR_TUNNEL_CONNECTION_FAILED')) {
      consoleErrors.push(msg.text());
    }
  });
  page.on('pageerror', err => {
    pageErrors.push(err);
  });

  await page.goto('/blog/cartan-newton-orbiting-lab');
  await expect(page).toHaveTitle(/The Orbiting Lab/);
  
  await page.waitForTimeout(2000);

  console.log('--- CONSOLE ERRORS ---', consoleErrors);
  console.log('--- PAGE ERRORS ---', pageErrors);

  await page.screenshot({ path: 'test-results/post-load.png' });
  expect(consoleErrors).toEqual([]);
  expect(pageErrors).toEqual([]);
});
