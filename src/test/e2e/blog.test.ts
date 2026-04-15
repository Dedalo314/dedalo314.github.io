import { test, expect } from '@playwright/test';

test('homepage should load and have correct title', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Aletheia | Frontiers of Thought/);
  await expect(
    page.getByRole('link', { name: 'Explore the Blog' })
  ).toBeVisible();

  // Verify modern styling elements
  const heroHeading = page.locator('h1');
  await expect(heroHeading).toHaveClass(/text-6xl/);
  await expect(heroHeading.locator('span.text-transparent')).toContainText(
    'Frontiers'
  );

  // Verify favicon logo is present in the header
  const headerLogo = page.locator('header img[alt="Aletheia Logo"]');
  await expect(headerLogo).toBeVisible();

  // Verify favicon is present in the head
  const favicon = page.locator('link[rel="icon"]');
  await expect(favicon).toHaveAttribute('href', '/favicon.svg');
});

test('blog index lists posts with modern cards', async ({ page }) => {
  await page.goto('/blog');
  await expect(page.getByText('Insights from the Frontiers')).toBeVisible();

  // Check for the new article card structure
  const firstArticle = page.locator('article').first();
  await expect(firstArticle).toHaveClass(/bg-gray-900/);
  await expect(firstArticle.locator('h2')).toBeVisible();
  await expect(firstArticle.getByText('Read Article')).toBeVisible();
});

test('sample post has modern typography and LaTeX', async ({ page }) => {
  await page.goto('/blog/relativistic-rocket');
  await page.waitForSelector('h1');
  await expect(page.locator('h1').first()).toHaveClass(/text-5xl/);

  // Check for the blog content area with prose and dark:prose-invert class
  const article = page.locator('article');
  await expect(article).toHaveClass(/prose dark:prose-invert prose-lg/);

  // Check for LaTeX (it might render with specific classes/tags)
  await expect(page.locator('.katex').first()).toBeVisible();

  // Ensure MathML is not visible to prevent double rendering
  const mathml = page.locator('.katex-mathml').first();
  if ((await mathml.count()) > 0) {
    await expect(mathml).not.toBeVisible();
  }
});

test('relativistic-rocket has correct LaTeX rendering', async ({ page }) => {
  await page.goto('/blog/relativistic-rocket');

  // Wait for content
  await page.waitForSelector('.katex');

  // Check for some equations
  const firstKatex = page.locator('.katex').first();
  await expect(firstKatex).toBeVisible();

  // Check if MathML is present and hidden
  const mathmlCount = await page.locator('.katex-mathml').count();
  if (mathmlCount > 0) {
    await expect(page.locator('.katex-mathml').first()).not.toBeVisible();
  }
});
