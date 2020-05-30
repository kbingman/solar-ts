const TAU = Math.PI * 2;

export const drawCircle = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  r: number,
  color: string
) => {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, TAU, false);
  ctx.fillStyle = color;
  ctx.fill();
};

export const drawRect = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  color: string
) => {
  ctx.fillRect(x, y, width, height);
  ctx.fillStyle = color;
  ctx.fill();
};

export const fillCanvas = (ctx: CanvasRenderingContext2D, color: string) => {
  drawRect(ctx, 0, 0, ctx.canvas.width, ctx.canvas.height, color);
};
