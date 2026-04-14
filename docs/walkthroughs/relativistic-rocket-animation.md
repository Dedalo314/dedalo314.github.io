# Walkthrough: Relativistic Rocket Animation (3D Upgrade)

## Execution Plan Reference

The implementation is based on `docs/exec-plans/active/relativistic-rocket.md`.

## Implementation Details

1. **React & Three.js Integration:**
   - Installed `three`, `@react-three/fiber`, and `@react-three/drei` to integrate 3D rendering into the React component.
   - Evaluated `package.json` to ensure type compatibility with `@types/three`.

2. **Component Upgrade (`src/components/RelativisticRocket.tsx`):**
   - Replaced the 2D SVG and parallax background with a fully 3D `<Canvas>`.
   - Built a custom `Rocket3D` model using primitive Three.js shapes (cylinders, cones, boxes) and standard materials to look stylish and modern.
   - Added a `MovingStars` component that dynamically adjusts the starfield velocity relative to the rocket's current relativistic speed ($v = \tanh \tau$).
   - Enhanced the engine exhaust: It uses a continuously glowing and scaling `SphereGeometry` to simulate thrust, pulsing even when paused to make the scene feel "alive."
   - The animation computations and React state remained identical, relying on `requestAnimationFrame` and $\tau$ to drive the physical parameters:
     - Earth Time ($t = \sinh \tau$)
     - Velocity ($v = \tanh \tau$)
     - Distance ($x = \cosh \tau - 1$)
     - Lorentz Factor ($\gamma = \cosh \tau$)
     - Mass Ratio ($M/M_0 = e^{-\tau}$)

3. **MDX Integration:**
   - The component still functions correctly within `src/content/blog/relativistic-rocket.mdx` using the `<RelativisticRocket client:load />` directive, allowing Astro to hydrate the React component on the client-side.

4. **Testing & Verification:**
   - Ensured eslint compatibility by temporarily disabling `react/no-unknown-property` to ignore JSX props on Three.js objects.
   - Executed E2E tests using `npx playwright test`, which successfully verified that the updated component renders gracefully inside the blog post without hydration errors.
   - Vitest unit tests passed without issue.

## Resolution

- The component actively demonstrates the exponential requirements of maintaining relativistic travel, now with an engaging, modern 3D aesthetic.
- The default stationary appearance has been addressed by making the 3D exhaust pulse continuously, increasing interactivity and realism.
