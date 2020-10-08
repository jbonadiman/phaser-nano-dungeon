/* eslint-disable no-undef */
/* eslint-disable import/extensions */
import dungeon from '../../dungeon.js';

const hunter = {
  name: 'Hunter',
  initialize() {
    if (this.type === 'enemy') {
      this.tint = 0xe3e3e3;
      if (this.sprite) {
        this.sprite.tint = this.tint;
        this.sprite.tintFill = true;
      }
    }
  },

  turn() {
    const oldX = this.x;
    const oldY = this.y;
    const pX = dungeon.player.x;
    const pY = dungeon.player.y;
    const grid = new PF.Grid(dungeon.level);
    const finder = new PF.AStarFinder();
    const path = finder.findPath(oldX, oldY, pX, pY, grid);

    if (this.movementPoints > 0) {
      if (path.length > 2) {
        dungeon.moveEntityTo(this, path[1][0], path[1][1]);
      }

      this.movementPoints -= 1;
    }

    if (this.actionPoints > 0) {
      if (dungeon.distanceBetweenEntities(this, dungeon.player) <= 2) {
        dungeon.attackEntity(this, dungeon.player, this.weapon);
      }

      this.actionPoints -= 1;
    }
  },
};

export default hunter;
