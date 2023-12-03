import { drawCircle, fillCanvas } from './draw';
import { Body } from './types';

const PIXELS_AU = 42;
const DAYS_YEAR = 365.25;

export const getRadius = (mass: number) => {
  const r = Math.log10(mass * 10e7);
  return Math.max(1, r);
};

export const updateSystem = (system: Body[]) =>
  system.map((body) => ({
    ...body,
    vx: body.vx * DAYS_YEAR,
    vy: body.vy * DAYS_YEAR,
    vz: body.vz * DAYS_YEAR,
    velocity: (body.velocity || []).map((v) => v * DAYS_YEAR),
  }));

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
    centerX + (body.x || body.position[0]) * PIXELS_AU,
    centerY + (body.y || body.position[1]) * PIXELS_AU,
    getRadius(body.m),
    color
  );
};

export const drawSystem = (ctx: CanvasRenderingContext2D, system: Body[]) => {
  // Fill background;
  fillCanvas(ctx, '#111');

  // Draw sun
  for (const body of system) {
    drawBody(ctx, body, body.color || 'white');
  }
};
