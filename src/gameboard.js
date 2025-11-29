export default class Gameboard {
  constructor() {
    this.ships = [];
    this.missedShots = [];
  }

  canPlaceShip(ship, start, direction) {
    for (let i = 0; i < ship.length; i++) {
      let x = start[0];
      let y = start[1];

      if (direction === 'horizontal') y += i;
      else x += i;

      // Check bounds
      if (x < 0 || x >= 10 || y < 0 || y >= 10) return false;

      // Check overlap
      for (const record of this.ships) {
        if (record.coords.some(c => c[0] === x && c[1] === y)) return false;
      }
    }
    return true;
  }

  placeShip(ship, start, direction) {
    if (!this.canPlaceShip(ship, start, direction)) {
      throw new Error('Invalid ship placement: out of bounds or overlapping.');
    }

    const coords = [];
    for (let i = 0; i < ship.length; i++) {
      if (direction === 'horizontal') coords.push([start[0], start[1] + i]);
      else coords.push([start[0] + i, start[1]]);
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
