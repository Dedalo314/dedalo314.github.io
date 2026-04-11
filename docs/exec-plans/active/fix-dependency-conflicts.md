# Execution Plan: Resolve Vite Version Conflicts and Rendering Errors

## Objectives

- Fix `ENOENT` error regarding `refresh-runtime.js` in `@astrojs/react`.
- Eliminate Vite version mismatches between Astro 5 (Vite 6) and Vitest (Vite 7).
- Ensure a consistent, clean dependency tree across the entire project.

## Tasks

1. [x] Analyze current dependency tree using `npm list`.
2. [x] Identify conflicts: `astro` uses Vite 6, while `vitest` v4 pulls in Vite 7.
3. [x] Downgrade `vitest` to `v3.x` to align with Vite 6.
4. [x] Add an `overrides` field in `package.json` to force `vite` to `^6.0.0` globally.
5. [x] Perform a clean reinstall (`rm -rf node_modules package-lock.json && npm install`).
6. [x] Verify that all tools (`astro build`, `npx playwright test`) function correctly with the consistent dependency tree.

## Verification Steps

- `npm list vite` must show `overridden` or `deduped` for all instances, pointing to the same Vite 6 version.
- `astro build` must complete without errors.
- Playwright tests must pass, confirming that React components (like `ParticleSystem`) are rendering correctly.
