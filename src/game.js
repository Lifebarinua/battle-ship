import Player from "./player.js";
import Ship from "./ship.js";

export default class Game {
  constructor(renderer) {
    this.renderer = renderer;

    this.player = new Player("human");
    this.computer = new Player("computer");

    this.current = this.player;

    // Define full fleet
    this.fleetLengths = [5, 4, 3, 3, 2]; // Carrier, Battleship, Cruiser, Submarine, Destroyer

    // Setup boards
    this.setupBoards();

    // Render initial boards
    this.renderer.renderBoards(this.player.board, this.computer.board);
  }

  setupBoards() {
    // Place full fleet for player (manual for now)
    let startX = 0;
    this.fleetLengths.forEach(length => {
      const ship = new Ship(length);
      // For simplicity, place all horizontally starting at row 0, row++, safe in bounds
      let row = startX;
      let col = 0;
      while (!this.player.board.canPlaceShip(ship, [row, col], "horizontal")) {
        row++;
      }
      this.player.board.placeShip(ship, [row, col], "horizontal");
      startX++;
    });

    // Place full fleet randomly for computer
    this.fleetLengths.forEach(length => {
      const ship = new Ship(length);
      let placed = false;
      while (!placed) {
        const direction = Math.random() < 0.5 ? "horizontal" : "vertical";
        const x = Math.floor(Math.random() * 10);
        const y = Math.floor(Math.random() * 10);
        if (this.computer.board.canPlaceShip(ship, [x, y], direction)) {
          this.computer.board.placeShip(ship, [x, y], direction);
          placed = true;
        }
      }
    });
  }

  playRound(x, y) {
    // Human attacks
    if (this.current.type !== "human") return; // ignore clicks if it's not player's turn

    const enemy = this.computer;
    const result = enemy.board.receiveAttack([x, y]);

    this.renderer.renderBoards(this.player.board, this.computer.board);
    this.showAttackMessage("Player", result, [x, y]);

    if (enemy.board.allShipsSunk()) {
      this.renderer.showWinner("Player");
      return;
    }

    this.switchTurn();

    // Computer turn
    if (this.current.type === "computer") {
      setTimeout(() => this.computerMove(), 500); // slight delay for UX
    }
  }

  computerMove() {
    const [x, y] = this.computer.getRandomMove();
    const result = this.player.board.receiveAttack([x, y]);

    this.renderer.renderBoards(this.player.board, this.computer.board);
    this.showAttackMessage("Computer", result, [x, y]);

    if (this.player.board.allShipsSunk()) {
      this.renderer.showWinner("Computer");
      return;
    }

    this.switchTurn();
  }

  switchTurn() {
    this.current = this.current === this.player ? this.computer : this.player;
  }

  showAttackMessage(who, result, [x, y]) {
    const message = `${who} attacked (${x}, ${y}) and it was a ${result.toUpperCase()}!`;
    console.log(message); // for now, console log; can be replaced with DOM feedback
  }
}
