import { drawCircle, fillCanvas } from './draw';
import { Planet, PointMass, Vector } from './types';

const PIXELS_AU = 42;
const DAYS_YEAR = 365.25;

export const getRadius = (mass: number) => {
  const r = Math.log10(mass * 10e7);
  return Math.max(1, r);
};

export const updateSystem = (system: PointMass[]) =>
  system.map((body) => ({
    ...body,
    velocity: (body.velocity || []).map((v) => v * DAYS_YEAR) as Vector,
  }));

export const drawBody = (ctx: CanvasRenderingContext2D, body: Planet) => {
  const canvas = ctx.canvas;
  const height = canvas.height;
  const width = canvas.width;
  const centerX = width / 2;
  const centerY = height / 2;

  drawCircle(
    ctx,
    centerX + body.position[0] * PIXELS_AU,
    centerY + body.position[1] * PIXELS_AU,
    getRadius(body.m),
    body.color
  );
};

export const drawSystem = (
  ctx: CanvasRenderingContext2D,
  system: PointMass[]
) => {
  // Fill background;
  fillCanvas(ctx, '#111');

  // Draw sun
  for (const body of system) {
    drawBody(ctx, body);
  }
};
