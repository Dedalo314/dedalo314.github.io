import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:4321';

test('Global language toggle changes language', async ({ page }) => {
  await page.goto(`${BASE_URL}/`);

  // Verify default language is English
  const aboutLink = page.getByRole('link', { name: 'About' });
  await expect(aboutLink).toHaveText('About');

  // Switch to Spanish
  await page.click('#lang-toggle-es');

  // Verify Spanish translation
  const aboutNavLinkEs = page.locator('nav a[href="/about"]');
  await expect(aboutNavLinkEs).toHaveText('Sobre nosotros');

  // Verify persistent state on new page
  await page.goto(`${BASE_URL}/about`);
  await expect(page.locator('nav a[href="/about"]')).toHaveText(
    'Sobre nosotros'
  );

  // Verify blog post redirection
  await page.goto(`${BASE_URL}/blog/cartan-newton-orbiting-lab`);
  // If global lang is 'es', it should redirect to /es/blog/...
  try {
    await page.waitForURL(/.*\/es\/blog\/.*/, { timeout: 10000 });
  } catch (e) {
    console.log('Current URL after failed redirect wait:', page.url());
    throw e;
  }
  await expect(page.locator('header h1')).toContainText('gravedad de Newton');

  // Switch back to English
  await page.click('#lang-toggle-en');
  await page.waitForURL(/.*\/blog\/.*/);
  await expect(page.locator('header h1')).toContainText('Newtonian Gravity');
});

test('Blog index filters by language', async ({ page }) => {
  await page.goto(`${BASE_URL}/blog`);

  // Force EN first to be sure
  await page.click('#lang-toggle-en');
  await expect(
    page.locator('.post-card[data-lang="en"]').first()
  ).toBeVisible();

  // Switch to Spanish
  await page.click('#lang-toggle-es');
  // It shouldn't redirect on /blog index, just filter
  await expect(
    page.locator('.post-card[data-lang="es"]').first()
  ).toBeVisible();

  // English posts hidden
  await expect(
    page.locator('.post-card[data-lang="en"]').first()
  ).not.toBeVisible();
});
