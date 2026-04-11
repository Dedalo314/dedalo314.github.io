# Execution Plan: Add Linter and Gitignore

## Objectives

- Create a standard `.gitignore` for an Astro project.
- Configure ESLint and Prettier for linting and formatting.
- Add linting and formatting checks to the GitHub Actions workflow.

## Tasks

1. [x] Create `.gitignore`.
2. [x] Install linting and formatting dependencies.
3. [x] Configure ESLint (`.eslintrc.cjs` or equivalent).
4. [x] Configure Prettier (`.prettierrc`).
5. [x] Add `lint` and `format` scripts to `package.json`.
6. [x] Update `.github/workflows/deploy.yml` to include a linting step.
7. [x] Run linting and formatting locally to verify.
8. [x] Resolve dependency conflict in CI by downgrading Astro integrations to v4.

## Verification Steps

- `npm run lint` passes.
- `npm run format` works.
- GitHub workflow includes linting and fails if linting fails.
