import Renderer from './dom.js';
import Game from './game.js';

const renderer = new Renderer();
const game = new Game(renderer);

document.querySelector('#computer-board').addEventListener('click', e => {
  if (!e.target.classList.contains('cell')) return;

  const index = [...e.target.parentNode.children].indexOf(e.target);
  const x = Math.floor(index / 10);
  const y = index % 10;

  game.playRound(x, y);
});
