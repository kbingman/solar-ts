import { drawCircle, fillCanvas } from "./draw";
import { Body } from "./types";

const AU = 200;

// TODO move to a prep step
const getRadius = (mass: number) => {
  const r = Math.log10(mass * 10e7);
  return r > 1.5 ? r : 1.5;
};

export const drawBody = (
  ctx: CanvasRenderingContext2D,
  body: Body,
  color: string
) => {
  const canvas = ctx.canvas;
  const height = canvas.height;
  const width = canvas.width;
  const centerX = width / 2;
  const centerY = height / 2;

  drawCircle(
    ctx,
    centerX + body.x * AU,
    centerY + body.y * AU,
    getRadius(body.m),
    color
  );
};

export const drawSystem = (ctx: CanvasRenderingContext2D, system: Body[]) => {
  // Fill background;
  fillCanvas(ctx, "#111");

  // Draw sun
  drawBody(ctx, system[0], "yellow");
  drawBody(ctx, system[1], "white");
  drawBody(ctx, system[2], "white");
  drawBody(ctx, system[3], "lightblue");
  drawBody(ctx, system[4], "coral");
};
