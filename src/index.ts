import { createCanvas, resizeCanvas } from "./canvas";
import { drawSystem, updateSystem } from "./system";
import { bodies1 as bodies } from "./bodies";
import { updateBodies } from "./legacy";
import { Body as Nbody } from "./types";

const G = 39.5;
const SOFTENING_CONSTANT = 0.15;
const DT = 0.0025;

const updateBodiesWithConstants = updateBodies(G, SOFTENING_CONSTANT, DT);

/**
 * Main application
 */
const main = () => {
  const app = document.getElementById("root");

  if (!app) {
    return;
  }

  const system = updateSystem(bodies as Nbody[]);
  const canvas = createCanvas(document);
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    return;
  }
  app.appendChild(canvas);

  const resize = () => {
    resizeCanvas(window, canvas);
  }

  const renderCanvas = () => {
    // console.time('render');
    resize();
    drawSystem(ctx, system);
    updateBodiesWithConstants(system);
    // console.timeEnd('render');
    window.requestAnimationFrame(renderCanvas);
  };

  // Events
  window.addEventListener("resize", resize);
  window.requestAnimationFrame(renderCanvas);
};

main();
