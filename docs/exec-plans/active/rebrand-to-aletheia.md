# Execution Plan: Rebranding to Aletheia

This plan outlines the steps to rebrand the "MathPhysicsAI" blog to "Aletheia", aligning with its core philosophy of exploring the "underlying principles of the universe and the intelligence that strives to understand it".

## Objectives

- Update the blog name to "Aletheia" across the entire codebase.
- Redesign the SVG logo to match the new brand and the website's visual style.
- Ensure consistency in titles, metadata, headers, footers, and documentation.

## Tasks

1. **Update Site Metadata and Global Components:**
   - [ ] Update `src/layouts/BaseLayout.astro` with the new name and tagline.
   - [ ] Update `src/pages/index.astro` title and hero section if necessary.
   - [ ] Update `src/pages/blog/index.astro` and `src/pages/about.astro` titles.
2. **Rebrand the Logo:**
   - [ ] Create a new `public/favicon.svg` that reflects the "Aletheia" concept (truth, unconcealment, underlying principles).
   - [ ] Ensure the logo uses the blue-indigo gradient (`from-blue-400 to-indigo-500`) to match the site's styling.
3. **Update Project Configuration and Documentation:**
   - [ ] Update `package.json` name and description.
   - [ ] Update `README.md` and `AGENTS.md`.
   - [ ] Update any relevant walkthroughs or design docs if they are active/relevant.
4. **Verification:**
   - [ ] Run `npm run build` to ensure no build errors.
   - [ ] Run existing Playwright tests to check for regressions in navigation/layout.

## Verification Steps

- [ ] Check that "Aletheia" appears in the browser tab title for all pages.
- [ ] Verify the header and footer display "Aletheia".
- [ ] Confirm the new logo renders correctly and scales well on mobile.
- [ ] Ensure all tests pass.
