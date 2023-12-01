import { renderCanvas } from './index';
import './style.css';

(async function main() {
  const app = document.getElementById('app');
  const canvas = renderCanvas();

  if (app && canvas) {
    app.append(canvas);
  }
})();
