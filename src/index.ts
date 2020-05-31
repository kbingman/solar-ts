import { createCanvas, resizeCanvas } from "./canvas";
import { drawSystem } from "./system";

/**
 * Main application
 */
const main = () => {
  const app = document.getElementById("root");

  if (!app) {
    return;
  }

  let canvas = resizeCanvas(window, createCanvas(document));
  app.appendChild(canvas);

  //const bodies = [{ mass: 1 }];
  const renderCanvas = () => {
    canvas = resizeCanvas(window, canvas);
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return;
    }

    console.log(Date.now());
    drawSystem(ctx);
    // window.requestAnimationFrame(renderCanvas);
  };

  // Events
  window.addEventListener("resize", renderCanvas);
  renderCanvas();
  // window.requestAnimationFrame(renderCanvas);
};

main();
