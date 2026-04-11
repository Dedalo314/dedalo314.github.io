# Walkthrough: Configuring GitHub Pages and Automation

## Summary

This walkthrough documents the setup for automated testing and deployment to GitHub Pages using GitHub Actions.

## Steps Taken

### 1. GitHub Actions Workflow Creation

- Created `.github/workflows/deploy.yml` with two jobs: `test` and `deploy`.
- The `test` job installs dependencies, installs Playwright browsers, builds the site, and runs all E2E tests.
- The `deploy` job depends on the success of the `test` job and only runs on pushes to the main branch.
- Configured proper GitHub permissions (`pages: write`, `id-token: write`) for deployment.

### 2. Configuration for dedalo314.github.io

- Updated `astro.config.mjs` with `site: 'https://dedalo314.github.io'`.
- Since this is the primary user site, the `base` path remains the default `/`.
- The repository must be named exactly `dedalo314.github.io` to be served as your default personal site at `https://dedalo314.github.io/`.

### 4. Verification

- The workflow will automatically run on your next push.
- You can monitor the progress in the **Actions** tab of your GitHub repository.
- Successful deployment will be accessible at `https://your-username.github.io/your-repo-name/`.

Refer to the execution plan at `docs/exec-plans/active/github-pages-setup.md` for more details.
