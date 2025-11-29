import Player from './player.js';

test('player has a gameboard', () => {
  const player = new Player('human');
  expect(player.board).toBeDefined();
});
