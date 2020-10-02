/* eslint-disable import/extensions */
/* eslint-disable no-console */
/* eslint-disable no-undef */
import dungeon from './dungeon.js';

export default class BasicMonster {
  constructor(x, y) {
    this.name = 'Skeleton';
    this.movementPoints = 1;
    this.actionPoints = 3;
    this.healthPoints = 1;
    this.x = x;
    this.y = y;
    this.tile = 26;
    dungeon.initializeEntity(this);
  }

  refresh() {
    this.movementPoints = 1;
    this.actionPoints = 3;
  }

  // eslint-disable-next-line class-methods-use-this
  attack() {
    return 1;
  }

  turn() {
    const oldX = this.x;
    const oldY = this.y;

    const playerX = dungeon.player.x;
    const playerY = dungeon.player.y;
    const grid = new PF.Grid(dungeon.level);
    const finder = new PF.AStarFinder();
    const path = finder.findPath(oldX, oldY, playerX, playerY, grid);

    if (this.movementPoints > 0) {
      if (path.length > 2) {
        dungeon.moveEntityTo(this, path[1][0], path[1][1]);
      }

      this.movementPoints -= 1;
    }

    if (this.actionPoints > 0) {
      if (dungeon.distanceBetweenEntities(this, dungeon.player) <= 2) {
        dungeon.attackEntity(this, dungeon.player);
      }

      this.actionPoints -= 1;
    }
  }

  over() {
    return this.movementPoints === 0 && this.actionPoints === 0 && !this.moving;
  }

  onDestroy() {
    console.log(`${this.name} was killed`);
  }
}
