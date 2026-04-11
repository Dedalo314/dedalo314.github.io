import { test, expect } from '@playwright/test';

test.describe('Theme Toggle', () => {
  test('should toggle theme when button is clicked', async ({ page }) => {
    await page.goto('/');

    const html = page.locator('html');
    const toggleBtn = page.locator('#theme-toggle');

    // Check initial state (depends on system preference, but we can check if it exists)
    const initialIsDark = await html.evaluate((el) =>
      el.classList.contains('dark')
    );

    await toggleBtn.click();

    if (initialIsDark) {
      await expect(html).not.toHaveClass(/dark/);
    } else {
      await expect(html).toHaveClass(/dark/);
    }

    await toggleBtn.click();

    if (initialIsDark) {
      await expect(html).toHaveClass(/dark/);
    } else {
      await expect(html).not.toHaveClass(/dark/);
    }
  });

  test('should follow system preference (dark)', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'dark' });
    await page.goto('/');
    await expect(page.locator('html')).toHaveClass(/dark/);
  });

  test('should follow system preference (light)', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'light' });
    await page.goto('/');
    await expect(page.locator('html')).not.toHaveClass(/dark/);
  });

  test('should persist theme preference in localStorage', async ({ page }) => {
    await page.goto('/');
    const toggleBtn = page.locator('#theme-toggle');
    const isDarkBefore = await page
      .locator('html')
      .evaluate((el) => el.classList.contains('dark'));

    await toggleBtn.click();
    const isDarkAfter = !isDarkBefore;

    await page.reload();

    const isDarkAfterReload = await page
      .locator('html')
      .evaluate((el) => el.classList.contains('dark'));
    expect(isDarkAfterReload).toBe(isDarkAfter);
  });
});
