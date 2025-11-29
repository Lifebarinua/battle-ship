import Renderer from './dom.js';
import Game from './game.js';

const renderer = new Renderer();
const game = new Game(renderer);

// Show initial turn
renderer.showTurn(game.current.type);

document.querySelector('#computer-board').addEventListener('click', e => {
  if (!e.target.classList.contains('cell')) return;
  if (game.current.type !== "human") return;

  const index = [...e.target.parentNode.children].indexOf(e.target);
  const x = Math.floor(index / 10);
  const y = index % 10;

  game.playRound(x, y);
});

// Override showAttackMessage to display in UI
game.showAttackMessage = (who, result, [x, y]) => {
  const msg = `${who} attacked (${x}, ${y}) and it was a ${result.toUpperCase()}!`;
  renderer.showMessage(msg);
  renderer.showTurn(game.current.type);
};
