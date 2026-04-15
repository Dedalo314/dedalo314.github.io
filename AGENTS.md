# Agent Navigation Map

Welcome. You are operating in an Astro-based codebase for Aletheia, a personal blog focusing on mathematics, physics, and artificial intelligence models/agents.

**Do not guess architectural patterns.** We use progressive disclosure. Read the localized documentation based on your current task:

- **Architecture & Boundaries:** Read `docs/design-docs/index.md` before creating new modules or importing files.
- **Agent Principles:** Read `docs/design-docs/core-beliefs.md` to understand our workflow constraints.
- **Refactoring or fixing bugs?** Always check `docs/exec-plans/tech-debt-tracker.md` first.

**Core Stack:**

- Framework: Astro
- Styling: Tailwind CSS & `src/components/`
- Testing: Playwright (E2E)
- Mathematical Formulas: LaTeX (via remark-math/rehype-katex)
- Dynamic Animations: Dynamic code support for loading animations (e.g., React/Vue/Svelte or vanilla JS)

## Implementing new features

For every new feature implemented:

1. Create an execution plan in markdown under `docs/exec-plans/active/`. Plans must include at least objectives, tasks and verification steps.
2. Execute the plan:
   2.1. Write TODO lists.
   2.2. Solve items one by one.
3. Ensure every item is correctly implemented with the verifications. Verifications must be automatic, repeatable and explicit (e.g., tests) if possible.
4. Ensure the documentation in the repository is up-to-date.
5. Ensure there are no breaking changes (e.g.: Dockerfile, tests, workflows...).
6. (If everything is ready) Create a branch and commit your changes.
7. Write a final, very detailed walkthrough and store it under `docs/walkthroughs/`. The walkthrough must cite the plan it solves, include evidence for every step you take and how you tested everything you implemented.

## Repository as Unique Source of Truth

The repository must be self-contained. If you find anything that you believe should be documented, you can include it in `docs/` and update AGENTS.md, README.md and other docs accordingly. Make sure it is not already documented somewhere else before.
