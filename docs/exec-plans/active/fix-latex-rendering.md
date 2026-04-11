# Execution Plan: Fix LaTeX Double Rendering

## Objectives

- Resolve the issue where LaTeX equations are rendered twice (styled KaTeX and plain text MathML).
- Ensure consistent rendering across all blog posts (MD and MDX).
- Verify the fix with Playwright tests.

## Tasks

1. [x] Research and reproduce the issue using Playwright. (Identified MathML is visible).
2. [x] Configure `rehype-katex` to output only HTML in `astro.config.mjs`.
3. [x] Refine existing tests to verify that `.katex-mathml` is NOT visible/present.
4. [x] Add a safety CSS rule in `BaseLayout.astro` to hide `.katex-mathml` globally.
5. [x] Run all tests and verify the fix.
6. [x] Document the fix in a walkthrough.
7. [x] Fix KaTeX CSS integrity mismatch (SRI error).

## Verification Steps

- Run `npx playwright test` and ensure all tests pass.
- Specifically, verify that `page.locator(".katex-mathml")` is hidden or non-existent.
