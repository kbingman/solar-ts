import { test, expect, vi } from 'vitest';
import { planets } from './bodies';
import { drawSystem } from './system';

const createMockCtx = () =>
  ({
    arc: vi.fn(),
    beginPath: vi.fn(),
    canvas: {
      width: 128,
      height: 128,
    },
    fill: vi.fn(),
    fillRect: vi.fn(),
  }) as unknown as CanvasRenderingContext2D;

test('drawSystem fills the background and adds a star', () => {
  const ctx = createMockCtx();
  drawSystem(ctx, planets);

  expect(ctx.fillRect).toHaveBeenCalledWith(0, 0, 128, 128);
  expect(ctx.arc).toHaveBeenCalledTimes(planets.length);
});
