import { describe, test, expect } from "vitest";
import { createCanvas, resizeCanvas } from "../src/canvas";

const getMockWindow = () =>
  (({
    innerWidth: 1440,
    innerHeight: 900,
    devicePixelRatio: 2,
  } as unknown) as Window);

/** @vitest-environment jsdom */
describe("canvas", () => {
  test("createCanvas returns the correct tag", () => {
    const canvas = createCanvas(document);
    expect(canvas.id).toBe("canvas");
    expect(canvas.tagName).toBe("CANVAS");
  });

  test("resizeCanvas sets the canvas height to be twice the window size", () => {
    const window = getMockWindow();
    const canvas = resizeCanvas(
      window,
      document.createElement("CANVAS") as HTMLCanvasElement
    );

    expect(canvas.width).toBe(2880);
    expect(canvas.height).toBe(1800);
  });

  test("resizeCanvas sets the canvas CSS to match the window size", () => {
    const window = getMockWindow();
    const canvas = resizeCanvas(
      window,
      document.createElement("CANVAS") as HTMLCanvasElement
    );

    expect(canvas.style.width).toBe("1440px");
    expect(canvas.style.height).toBe("900px");
  });
});
