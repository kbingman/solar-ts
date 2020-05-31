const TAU = Math.PI * 2;

/**
 * Create a solid circle
 */
export const drawCircle = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  r: number,
  fill: string
) => {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, TAU, false);
  ctx.fillStyle = fill;
  ctx.fill();
};

/**
 * Create a solid rectangle
 */
export const drawRect = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  fill: string
) => {
  ctx.fillRect(x, y, width, height);
  ctx.fillStyle = fill;
  ctx.fill();
};

/**
 * fill the entire canvas with the given color
 */
export const fillCanvas = (ctx: CanvasRenderingContext2D, color: string) => {
  drawRect(ctx, 0, 0, ctx.canvas.width, ctx.canvas.height, color);
};
