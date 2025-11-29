import Gameboard from '../src/gameboard.js';
import Ship from '../src/ship.js';

test('places ships on the board', () => {
  const board = new Gameboard();
  const ship = new Ship(3);
  board.placeShip(ship, [0, 0], 'horizontal');

  expect(board.ships.length).toBe(1);
});

test('records a hit on a ship', () => {
  const board = new Gameboard();
  const ship = new Ship(2);
  board.placeShip(ship, [0, 0], 'horizontal');

  board.receiveAttack([0, 1]);

  expect(ship.hits).toBe(1);
});

test('records missed attacks', () => {
  const board = new Gameboard();
  board.receiveAttack([5, 5]);
  expect(board.missedShots).toContainEqual([5, 5]);
});

test('reports when all ships are sunk', () => {
  const board = new Gameboard();
  const ship = new Ship(1);
  board.placeShip(ship, [0, 0], 'horizontal');
  board.receiveAttack([0, 0]);

  expect(board.allShipsSunk()).toBe(true);
});
