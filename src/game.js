import Player from "./player.js";

export default class Game {
  constructor(renderer) {
    this.renderer = renderer;

    this.player = new Player("human");
    this.computer = new Player("computer");

    this.current = this.player;

    // For now: predetermined ship placement
    this.setupBoards();

    this.renderer.renderBoards(this.player.board, this.computer.board);
  }

  setupBoards() {
    // example: place a ship manually
    this.player.board.placeShip(new Ship(3), [0,0], "horizontal");
    this.computer.board.placeShip(new Ship(3), [2,2], "vertical");
  }

  playRound(x, y) {
    const enemy = this.current === this.player ? this.computer : this.player;
    enemy.board.receiveAttack([x, y]);

    this.renderer.renderBoards(this.player.board, this.computer.board);

    if (enemy.board.allShipsSunk()) {
      this.renderer.showWinner(this.current.type);
      return;
    }

    this.switchTurn();

    if (this.current.type === "computer") {
      const [cx, cy] = this.computer.getRandomMove();
      this.playRound(cx, cy);
    }
  }

  switchTurn() {
    this.current = this.current === this.player ? this.computer : this.player;
  }
}
