# Core Beliefs & Operating Principles

1. **Verify, Don't Trust:** If you write code, you must verify it. Use `npx playwright test` for end-to-end verification. Ensure LaTeX renders as expected and dynamic components load correctly.
2. **Read Errors Carefully:** If a build, linter, or test fails, do not just "try harder" or blindly rewrite. Read the specific error output, understand the boundary violation, and fix the root cause.
3. **No Ghost Knowledge:** If you make an architectural decision or uncover a bug, you must document it. Update `docs/exec-plans/tech-debt-tracker.md` or the relevant design doc.
4. **Mechanical Enforcement:** Respect the layering in `design-docs/index.md`. Keep components reusable and content separate. Use `src/lib/` for shared logic.
5. **Formulas & Animations:** For mathematics/physics content, prioritize clarity in formulas (LaTeX). For animations, ensure they are responsive and performant.
