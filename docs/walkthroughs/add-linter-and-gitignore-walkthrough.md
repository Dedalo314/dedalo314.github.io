# Walkthrough: Adding Linter and Gitignore

## Summary

This walkthrough documents the addition of a standard `.gitignore` file and the configuration of ESLint and Prettier for the Astro project, including integration into the GitHub Actions workflow.

## Steps Taken

### 1. Gitignore Creation

- Created a standard `.gitignore` for Astro projects, including `node_modules/`, `dist/`, `.astro/`, and Playwright test results.

### 2. Linting and Formatting Dependencies

- Installed `eslint`, `prettier`, and relevant plugins for Astro, React, and TypeScript.
- Used `--legacy-peer-deps` to handle version mismatches between `astro` and `@astrojs/mdx` peer dependencies in the current environment.

### 3. ESLint Configuration

- Created `.eslintrc.cjs` with specialized rules for `.astro`, `.jsx`, and `.mdx` files.
- Configured React rules to only apply to JSX/TSX files to avoid false positives in Astro files.
- Added `.eslintignore` to skip `dist/` and other non-source files.

### 4. Prettier Configuration

- Created `.prettierrc` with `prettier-plugin-astro` for correct formatting of `.astro` files.
- Added `.prettierignore` to ensure consistent formatting across the codebase.

### 5. Script Integration

- Added `lint` and `format` scripts to `package.json`.
- Ran `npm run format` to ensure all existing files are correctly formatted.

### 6. Workflow Integration

- Updated `.github/workflows/deploy.yml` to include a "Lint and Format check" step in the `test` job.
- This ensures that any push with linting or formatting errors will fail the CI.

## Verification

- `npm run lint` passes with no errors.
- `npx prettier --check .` passes successfully.
- The GitHub Actions workflow file now includes the linting step.

Refer to the execution plan at `docs/exec-plans/active/add-linter-and-gitignore.md` for more details.
