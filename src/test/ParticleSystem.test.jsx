import { render, screen } from '@testing-library/react';
import ParticleSystem from '../components/ParticleSystem.jsx';
import { describe, it, expect, vi } from 'vitest';
import React from 'react';

// Mock requestAnimationFrame
global.requestAnimationFrame = vi.fn();
global.cancelAnimationFrame = vi.fn();

describe('ParticleSystem', () => {
  it('renders correctly', () => {
    const { container } = render(<ParticleSystem />);
    const canvas = container.querySelector('canvas');
    expect(canvas).toBeDefined();
    expect(screen.getByText(/Dynamic Particle System/)).toBeInTheDocument();
  });
});
