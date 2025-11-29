export default class Renderer {
  constructor() {
    this.playerBoardDiv = document.querySelector('#player-board');
    this.computerBoardDiv = document.querySelector('#computer-board');
  }

  renderBoards(playerBoard, computerBoard) {
    this.renderBoard(this.playerBoardDiv, playerBoard, false);
    this.renderBoard(this.computerBoardDiv, computerBoard, true);
  }

  renderBoard(container, board, hideShips) {
    container.innerHTML = '';

    for (let x = 0; x < 10; x++) {
      for (let y = 0; y < 10; y++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');

        const isShip = board.ships.some(record =>
          record.coords.some(c => c[0] === x && c[1] === y)
        );

        if (!hideShips && isShip) cell.classList.add('ship');

        if (board.missedShots.some(c => c[0] === x && c[1] === y)) {
          cell.classList.add('miss');
        }

        for (const record of board.ships) {
          if (record.hits.some(c => c[0] === x && c[1] === y)) {
            cell.classList.add('hit');
          }
        }

        container.appendChild(cell);
      }
    }
  }

  showWinner(who) {
    alert(`${who} wins!`);
  }
}
