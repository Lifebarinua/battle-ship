import Gameboard from './gameboard.js';

export default class Player {
  constructor(type = 'human') {
    this.type = type;
    this.board = new Gameboard();
    this.previousMoves = new Set();
  }

  getRandomMove() {
    let x, y, key;
    do {
      x = Math.floor(Math.random() * 10);
      y = Math.floor(Math.random() * 10);
      key = `${x},${y}`;
    } while (this.previousMoves.has(key));

    this.previousMoves.add(key);
    return [x, y];
  }
}
