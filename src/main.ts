import { renderSystem } from './render-system';
import './style.css';

(async function main() {
  const app = document.getElementById('app');
  const canvas = renderSystem();

  if (app && canvas) {
    app.append(canvas);
  }
})();
