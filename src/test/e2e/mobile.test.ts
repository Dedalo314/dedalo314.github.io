import { test, expect, devices } from '@playwright/test';

test.use({
  ...devices['iPhone 13'],
  defaultBrowserType: 'chromium'
});

test('mobile responsiveness check', async ({ page }) => {
  await page.goto('/');
  await page.screenshot({ path: 'mobile-home.png', fullPage: true });
  
  await page.goto('/blog');
  await page.screenshot({ path: 'mobile-blog.png', fullPage: true });
  
  await page.goto('/blog/relativistic-rocket');
  await page.screenshot({ path: 'mobile-post.png', fullPage: true });
});
