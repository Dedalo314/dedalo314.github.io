# Execution Plan: Add Light Theme Support

## Objectives

- Implement light theme support alongside the existing dark theme.
- Respect system/browser theme preference by default.
- Provide a persistent theme toggle button in the header.
- Ensure all pages and components are visually consistent in both themes.

## Tasks

1. [x] Update `tailwind.config.mjs` to enable class-based dark mode (`darkMode: 'class'`).
2. [x] Create `ThemeToggle.astro` component with toggle logic and persistent `localStorage` storage.
3. [x] Modify `BaseLayout.astro` to:
   - Include a script in the `<head>` to initialize the theme and prevent flickering.
   - Update the `<body>` and `<header>` with semantic color classes (`bg-white dark:bg-black`, etc.).
   - Integrate the `ThemeToggle` component into the navigation.
4. [x] Update semantic colors across all pages:
   - `src/pages/index.astro`: Update hero section and featured topics.
   - `src/pages/blog/index.astro`: Update article cards and headings.
   - `src/pages/blog/[...slug].astro`: Update blog post header and typography (using `prose dark:prose-invert`).
5. [x] Update `src/components/ParticleSystem.jsx` to support light mode backgrounds.
6. [x] Verify implementation:
   - Create `src/test/e2e/theme.test.ts` to test toggle functionality and persistence.
   - Update `src/test/e2e/blog.test.ts` to match new class names.
   - Run all Playwright tests.
7. [x] Document the changes in a walkthrough.

## Verification Steps

- Run `npx playwright test`.
- Manually verify theme switching and persistence.
- Confirm system preference is followed on first load.
