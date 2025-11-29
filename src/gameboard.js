export default class Gameboard {
  constructor() {
    this.ships = [];       // each ship has location data
    this.missedShots = [];
  }

  placeShip(ship, start, direction) {
    const coords = [];

    for (let i = 0; i < ship.length; i++) {
      if (direction === 'horizontal') {
        coords.push([start[0], start[1] + i]);
      } else {
        coords.push([start[0] + i, start[1]]);
      }
    }

    this.ships.push({ ship, coords, hits: [] });
  }

  receiveAttack(position) {
    for (const record of this.ships) {
      const index = record.coords.findIndex(
        (c) => c[0] === position[0] && c[1] === position[1]
      );

      if (index !== -1) {
        record.ship.hit();
        record.hits.push(position);
        return "hit";
      }
    }

    this.missedShots.push(position);
    return "miss";
  }

  allShipsSunk() {
    return this.ships.every(record => record.ship.isSunk());
  }
}
