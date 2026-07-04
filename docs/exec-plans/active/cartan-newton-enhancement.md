# Execution Plan: Enhance Cartan-Newton Orbiting Lab Post

## Objectives

- Enhance the "Cartan-Newton Orbiting Lab" blog post with an interactive 3D visualization, detailed SymPy derivations, and collapsible code sections.
- Fix incorrect frontmatter.

## Tasks

1. [ ] Create `src/components/Collapsible.tsx`
2. [ ] Create `src/components/GeodesicDeviation.tsx`
3. [ ] Modify `src/content/blog/cartan-newton-orbiting-lab.mdx` (Frontmatter + components)
4. [ ] Create `src/test/e2e/geodesic.test.ts`
5. [ ] Verify with `npm run build` and `npx playwright test`

## Verification

- Automatic: `npm run build` and `npx playwright test src/test/e2e/geodesic.test.ts`
- Manual: Open the blog post in browser to check visualization and collapsible sections.
