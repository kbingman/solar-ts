import { createCanvas, resizeCanvas } from "./canvas";
import { drawSystem } from "./system";
import { bodies } from "./bodies";
import { updateBodies } from "./legacy";
import { Body as Nbody } from "./types";

const G = 39.5;
const SOFTENING_CONSTANT = 0.15;
const DT = 0.001;

const updateBodiesWithConstants = updateBodies(G, SOFTENING_CONSTANT, DT);

/**
 * Main application
 */
const main = () => {
  const app = document.getElementById("root");

  if (!app) {
    return;
  }

  let system = bodies as Nbody[];
  let canvas = resizeCanvas(window, createCanvas(document));
  app.appendChild(canvas);

  //const bodies = [{ mass: 1 }];
  const renderCanvas = () => {
    canvas = resizeCanvas(window, canvas);
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return;
    }

    drawSystem(ctx, system);
    updateBodiesWithConstants(system);
    window.requestAnimationFrame(renderCanvas);
  };

  // Events
  window.addEventListener("resize", renderCanvas);
  // renderCanvas();
  window.requestAnimationFrame(renderCanvas);
};

main();
