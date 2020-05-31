/**
 * Canvas Renderer
 */
export const createCanvas = (document: Document): HTMLCanvasElement => {
  const canvas = document.createElement('CANVAS') as HTMLCanvasElement;
  canvas.id = 'canvas'; // TODO allow id to be set for multiple layers

  return canvas;
};

/**
 * Canvas Risizer
 */
export const resizeCanvas = (window: Window, canvas: HTMLCanvasElement): HTMLCanvasElement => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const pixelRatio = window.devicePixelRatio;

  canvas.width = width * pixelRatio;
  canvas.height = height * pixelRatio;
  canvas.style.height = `${height}px`;
  canvas.style.width = `${width}px`;
  canvas.style.display = 'block';

  return canvas;
};

