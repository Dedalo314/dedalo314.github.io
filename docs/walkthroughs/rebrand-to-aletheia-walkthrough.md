# Walkthrough: Rebranding to Aletheia

This walkthrough documents the process of rebranding the blog from "MathPhysicsAI" to "Aletheia", aligning with its philosophical focus on the underlying principles of the universe and synthetic intelligence.

## Changes

### 1. Site Identity and Metadata

- Updated the blog name to **Aletheia** across all pages.
- Updated the tagline in `src/layouts/BaseLayout.astro` and `src/pages/index.astro` to: _"The underlying principles of the universe and the intelligence that strives to understand it."_
- Updated `package.json` and `README.md` to reflect the new brand.
- Updated `AGENTS.md` to acknowledge the new site name.

### 2. UI Components & About Page

- **Header & Footer:** Replaced all instances of "MathPhysicsAI" with "Aletheia".
- **Blog Post Template:** Updated the default author/placeholder to "A" (from "M") and the default author name to "Aletheia".
- **About Page Redesign:**
  - Rewrote the author's section in the first person with a humble, literary tone.
  - Incorporated themes of the **Borgesian labyrinth**, **Daedalus**, and **Dostoevsky**.
  - Fixed a mobile layout issue where sticky icons overlapped text during scrolling.
  - Corrected bold text rendering for "Neo" and refined punctuation for better flow.

### 3. Logo Redesign

- Created a new modern SVG logo in `public/favicon.svg`.
- The new logo features a stylized "A" that also resembles a prism or lens, using the site's signature blue-indigo gradient (`from-blue-400 to-indigo-500`).
- The logo is designed to work well in both light and dark modes.

### 4. Verification

- **Build:** Ran `npm run build` successfully.
- **Testing:** Updated Playwright E2E tests to expect the new title and logo alt text. All 9 tests passed.

## Evidence

- Site Title: `<title>Aletheia | Frontiers of Thought</title>`
- Logo Alt Text: `alt="Aletheia Logo"`
- Tagline: _"The underlying principles of the universe and the intelligence that strives to understand it."_
- Test results: `9 passed (9.4s)`
