import { test, expect, vi } from 'vitest';
import { drawRect, drawCircle, fillCanvas } from './draw';

const createMockCtx = () =>
  ({
    arc: vi.fn(),
    beginPath: vi.fn(),
    canvas: {
      width: 32,
      height: 48,
    },
    fill: vi.fn(),
    fillRect: vi.fn(),
  }) as unknown as CanvasRenderingContext2D;

test('drawRect', () => {
  const ctx = createMockCtx();
  drawRect(ctx, 0, 0, 24, 24, 'chartreuse');

  expect(ctx.fillRect).toHaveBeenCalledWith(0, 0, 24, 24);
  expect(ctx.fillStyle).toBe('chartreuse');
  expect(ctx.fill).toHaveBeenCalled();
});

test('drawCircle', () => {
  const ctx = createMockCtx();
  drawCircle(ctx, 32, 32, 16, 'chartreuse');

  expect(ctx.beginPath).toHaveBeenCalled();
  expect(ctx.arc).toHaveBeenCalledWith(32, 32, 16, 0, Math.PI * 2, false);
  expect(ctx.fillStyle).toBe('chartreuse');
  expect(ctx.fill).toHaveBeenCalled();
});

test('fillCanvas', () => {
  const ctx = createMockCtx();
  fillCanvas(ctx, 'lightcoral');

  expect(ctx.fillRect).toHaveBeenCalledWith(0, 0, 32, 48);
  expect(ctx.fillStyle).toBe('lightcoral');
  expect(ctx.fill).toHaveBeenCalled();
});
