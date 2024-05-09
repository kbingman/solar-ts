import { createCanvas, resizeCanvas } from './canvas';
import { drawSystem, updateSystem } from './system';
import { planets } from './bodies';
import { updateBodies } from './physics';

const G = 39.5;
const SOFTENING_CONSTANT = 0.15;
const DT = 0.0025;

const updateBodiesWithConstants = updateBodies(G, SOFTENING_CONSTANT, DT);

/**
 * Main application
 */
export const renderSystem = (): HTMLCanvasElement | undefined => {
  const system = updateSystem(planets);
  const canvas = createCanvas(document);
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    return;
  }

  const resize = () => {
    resizeCanvas(window, canvas);
  };

  const renderCanvas = () => {
    // console.time('render');
    resize();
    drawSystem(ctx, system);
    updateBodiesWithConstants(system);
    // console.timeEnd('render');
    window.requestAnimationFrame(renderCanvas);
  };

  // Events
  window.addEventListener('resize', resize);
  window.requestAnimationFrame(renderCanvas);

  return canvas;
};
