import { drawCircle, drawRect, fillCanvas } from './draw';

export const drawSystem = (ctx: CanvasRenderingContext2D) => {
  const canvas = ctx.canvas;
  const height = canvas.height;
  const width = canvas.width;

  // Fill background;
  fillCanvas(ctx, '#111');

  // Draw sun
  drawCircle(ctx, width / 2, height / 2, 10, 'yellow');
};
