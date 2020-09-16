import { bodies } from '../src/bodies';
import { drawSystem } from '../src/system';

const createMockCtx = () => ({
  arc: jest.fn(),
  beginPath: jest.fn(),
  canvas: {
    width: 128,
    height: 128
  },
  fill: jest.fn(),
  rect: jest.fn(),
} as unknown as CanvasRenderingContext2D);

test('drawSystem fills the background and adds a star', () => {
  const ctx = createMockCtx();
  drawSystem(ctx, bodies);

  expect(ctx.rect).toHaveBeenCalledWith(0, 0, 128, 128);
  expect(ctx.arc).toHaveBeenCalledTimes(bodies.length)
});

