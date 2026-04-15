# Execution Plan: Relativistic Rocket Animation

## Objective

Implement a stylish and illustrative 3D animation for the "Relativistic Rocket" article in the Astro blog, using React, Three.js (@react-three/fiber), and Tailwind CSS.

## Tasks

1. Create a new React component `src/components/RelativisticRocket.tsx` using Three.js for 3D rendering.
2. The component will animate the journey of a relativistic rocket accelerating at 1g ($9.81 m/s^2$, but $g=1$ in natural units with $c=1$ and 1 year as time unit).
3. The component should visually display:
   - Proper Time ($\tau$)
   - Earth Time ($t = \sinh(\tau)$)
   - Velocity ($v = \tanh(\tau)$)
   - Mass Ratio ($M/M_0 = e^{-\tau}$)
   - Distance traveled ($x = \cosh(\tau) - 1$)
4. The visual will have a 3D rocket model, a glowing pulsing exhaust flame that continues to animate even when paused, a moving 3D starfield, and dynamic charts/numbers tracking the parameters as they evolve in proper time.
5. Embed the component in `src/content/blog/relativistic-rocket.mdx`.
6. Verify the page and component render properly using `npx playwright test`.
7. Document the implementation in `docs/walkthroughs/relativistic-rocket-animation.md`.
8. Update `docs/exec-plans/tech-debt-tracker.md` to check off the animation task.

## Verification Steps

- Check that the component renders without React errors in the Astro dev server.
- Ensure the equations correctly match the relativistic rocket kinematics.
- Run `npm run lint`, `npx playwright test` to ensure no errors.
