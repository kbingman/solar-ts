import { createCanvas, resizeCanvas } from "./canvas";
import { drawSystem, getCoord, updateSystem } from "./system";
import { bodies } from "./bodies";
import { updateBodies } from "./gravity";
import { Body as Nbody } from "./types";

const G = 39.5;
const SOFTENING_CONSTANT = 0.15;
const DT = 0.0025;
const THRESHOLD = 12;

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
  const ctx = canvas.getContext("2d", {alpha: false});

  if (!ctx) {
    return;
  }
  app.appendChild(canvas);

  const resize = () => {
    resizeCanvas(window, canvas);
  };

  const findPlanet = ({ clientX, clientY }: MouseEvent) => {
    const height = canvas.height;
    const width = canvas.width;
    const centerX = width / 2;
    const centerY = height / 2;

    system.forEach((b) => {
      const x = getCoord(centerX, b.x);
      const y = getCoord(centerY, b.y);
      if (
        x > clientX * 2 - THRESHOLD &&
        x < clientX * 2 + THRESHOLD &&
        y > clientY * 2 - THRESHOLD &&
        y < clientY * 2 + THRESHOLD
      ) {
        b.active = true;
      } else {
        b.active = false;
      }
    });
  };

  const renderCanvas = () => {
    resize();
    drawSystem(ctx, system);
    updateBodiesWithConstants(system);
    window.requestAnimationFrame(renderCanvas);
  };

  // Events
  canvas.addEventListener("click", findPlanet);
  window.addEventListener("resize", resize);
  window.requestAnimationFrame(renderCanvas);
};

main();
