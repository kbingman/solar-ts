import { drawSystem } from "../src/system";
import { Body } from "../src/types";

const createMockCtx = () =>
  (({
    arc: jest.fn(),
    beginPath: jest.fn(),
    canvas: {
      width: 128,
      height: 128,
    },
    fill: jest.fn(),
    fillRect: jest.fn(),
  } as unknown) as CanvasRenderingContext2D);

test("drawSystem fills the background and adds a star", () => {
  const ctx = createMockCtx();
  const bodies: Body[] = [
    {
      m: 1,
      r: 10,
      color: "yellow",
      name: "Sun",
      x: 0,
      y: 0,
      z: 0,
      vx: 0,
      vy: 0,
      vz: 0,
    },
  ];
  drawSystem(ctx, bodies);

  expect(ctx.fillRect).toHaveBeenCalledWith(0, 0, 128, 128);
  expect(ctx.arc).toHaveBeenCalledWith(64, 64, 10, 0, Math.PI * 2, false);
});
