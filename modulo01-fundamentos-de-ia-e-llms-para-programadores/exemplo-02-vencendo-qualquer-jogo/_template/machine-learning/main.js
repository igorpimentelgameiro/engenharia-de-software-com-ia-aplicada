import { buildLayout } from './layout';

export default async function main(game) {
  const container = buildLayout(game.app);
  const worker = new Worker(new URL('./worker.js', import.meta.url));
  let modelReady = false;
  let predictionRunning = false;

  game.stage.aim.visible = false;

  worker.onmessage = ({ data }) => {
    const { type } = data;

    if (type === 'model-loaded') {
      modelReady = true;
      return;
    }

    if (type === 'prediction-complete' || type === 'prediction-error' || type === 'model-error') {
      predictionRunning = false;
      return;
    }

    if (type === 'prediction') {
      predictionRunning = false;
      container.updateHUD(data);
      game.stage.aim.visible = true;

      game.stage.aim.setPosition(data.x, data.y);
      const position = game.stage.aim.getGlobalPosition();

      game.handleClick({
        global: position,
      });

    }

  };

  setInterval(async() => {
    if (!modelReady || predictionRunning) {
      return;
    }

    predictionRunning = true;

    try {
      const canvas = game.app.renderer.extract.canvas(game.stage);
      const bitmap = await createImageBitmap(canvas);

      worker.postMessage({
        type: 'predict',
        image: bitmap,
      }, [bitmap]);
    } catch {
      predictionRunning = false;
    }

  }, 200); // every 200ms

  return container;
}
