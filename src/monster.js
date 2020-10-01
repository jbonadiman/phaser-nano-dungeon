import dungeon from './dungeon.js'

export default class BasicMonster {
  constructor (x, y) {
    this.movementPoints = 1;
    this.x = x;
    this.y = y;
    this.tile = 26;
    dungeon.initializeEntity(this);
  }

  refresh() {
    this.movementPoints = 1;
  }

  turn() {
    const oldX = this.x;
    const oldY = this.y;

    if (this.movementPoints > 0) {
      const playerX = dungeon.player.x;
      const playerY = dungeon.player.y;
      const grid = new PF.Grid(dungeon.level);
      const finder = new PF.AStarFinder();
      const path = finder.findPath(oldX, oldY, playerX, playerY, grid);

      if (path.length > 2) {
        dungeon.moveEntityTo(this, path[1][0], path[1][1]);
      }

      this.movementPoints -= 1;
    }
  }

  over() {
    return this.movementPoints == 0 && !this.moving;
  }
}