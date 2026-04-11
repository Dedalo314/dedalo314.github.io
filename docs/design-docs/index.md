# Architecture Map & Dependency Layering

To maintain a predictable structure for agent operations, this codebase enforces strict dependency directions suited for an Astro-based project.

## Dependency Layers

Data and imports must flow in one direction:
`pages/` → `layouts/` → `components/` → `lib/` & `content/`

**Rules:**

1. **`src/pages/` (Routing):**
   - Handles page-level data fetching (if any) and rendering.
   - _May_ import from `src/layouts/`, `src/components/`, `src/lib/`, and `src/content/`.
   - _Must not_ contain heavy UI logic. Delegate to components.

2. **`src/layouts/` (Shell):**
   - Defines the common structure for pages (e.g., `<BaseLayout>`).
   - _May_ import from `src/components/`, `src/lib/`.
   - _Must not_ import from `src/pages/`.

3. **`src/components/` (Presentation):**
   - Pure, reusable primitive or feature-based components.
   - _May_ import from `src/lib/`.
   - _Must not_ import from `src/pages/`, `src/layouts/` or `src/content/` collections directly (prefer passing data via props).

4. **`src/content/` (Data/Collections):**
   - Managed content collections (markdown, mdx).
   - _Must not_ import from any other layer.

5. **`src/lib/` (Utilities):**
   - Pure functions, helper scripts, and LaTeX/rendering configuration.
   - _Must not_ import from any other layer.
