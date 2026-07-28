import main from './machine-learning/main';
import Game from './src/modules/Game';

function showStartupError() {
  document.body.textContent = '';

  const message = document.createElement('main');
  message.style.cssText = [
    'min-height:100vh',
    'display:flex',
    'flex-direction:column',
    'align-items:center',
    'justify-content:center',
    'gap:12px',
    'padding:24px',
    'background:#101820',
    'color:#f5f7fa',
    'font-family:Arial,sans-serif',
    'text-align:center'
  ].join(';');

  const title = document.createElement('h1');
  title.textContent = 'WebGL nao esta disponivel';
  title.style.cssText = 'margin:0;font-size:28px';

  const description = document.createElement('p');
  description.textContent = 'Ative a aceleracao grafica do navegador ou teste em outro navegador para rodar o jogo.';
  description.style.cssText = 'max-width:560px;margin:0;font-size:16px;line-height:1.5';

  message.appendChild(title);
  message.appendChild(description);
  document.body.appendChild(message);
}

document.addEventListener('DOMContentLoaded', async function() {
  try {
    const game = new Game({
      spritesheet: 'sprites.json'
    });
    await game.load();
    await main(game);
  } catch {
    showStartupError();
  }

}, false);
