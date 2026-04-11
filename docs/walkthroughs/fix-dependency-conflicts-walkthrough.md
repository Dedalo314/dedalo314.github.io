# Walkthrough: Resolving Vite Version Conflicts and Rendering Errors

## Summary

This walkthrough documents the fix for the `ENOENT` error regarding `refresh-runtime.js` in `@astrojs/react` by resolving version mismatches between Astro, Vitest, and Vite.

## Plan Citations

- [docs/exec-plans/active/fix-dependency-conflicts.md](../exec-plans/active/fix-dependency-conflicts.md)

## Evidence and Steps Taken

1. **Identification of Issue**:
   - The user reported an `ENOENT` error when rendering React pages, specifically missing `refresh-runtime.js` inside a nested `@vitejs/plugin-react` within `@astrojs/react`.
   - Analysis of `npm list` revealed a conflict: `astro@5.x` uses Vite 6, while `vitest@4.x` was pulling in Vite 7.
   - This mismatch caused npm to install multiple, inconsistent versions of Vite and its plugins, leading to broken path resolution.

2. **Fix Implementation**:
   - **Version Alignment**: Downgraded `vitest` to `^3.2.4` to better align with Vite 6.
   - **Forced Consistency**: Added a global `overrides` field in `package.json` to force `vite` to stay on version `^6.0.0` for all dependencies.
   - **Clean Environment**: Deleted `node_modules` and `package-lock.json` and performed a fresh `npm install`.

3. **Verification**:
   - Verified the dependency tree with `npm list vite`, which now shows a single, consistent version of Vite 6 across all packages.
   - Ran `astro build` successfully, confirming that the rendering engine is stable.
   - Ran Playwright E2E tests, and all 8 tests passed, confirming that React-based dynamic components are rendering and functioning correctly.

## Conclusion

By enforcing a single version of Vite across the entire project using `overrides`, we've eliminated the source of the `ENOENT` rendering errors and ensured long-term dependency stability.
