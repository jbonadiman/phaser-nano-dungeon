/* eslint-disable no-undef */
/* eslint-disable import/extensions */
import dungeon from '../../dungeon.js';

const wanderer = {
  name: 'Wanderer',
  initialize() {
    if (this.type === 'enemy') {
      this.tint = 0xdd0000;
      if (this.sprite) {
        this.sprite.tint = this.tint;
        this.sprite.tintFill = true;
      }
    }
  },

  turn() {
    const oldX = this.x;
    const oldY = this.y;
    let dX = this.destinationX;
    let dY = this.destinationY;

    if (!dX || !dY) {
      const randomCoords = dungeon.randomWalkableTile();
      this.destinationX = randomCoords.x;
      this.destinationY = randomCoords.y;
      dX = this.destinationX;
      dY = this.destinationY;
    }

    // eslint-disable-next-line no-console
    console.log(`${this.name} going to ${dX},${dY}`);

    const grid = new PF.Grid(dungeon.level);
    const finder = new PF.AStarFinder();
    const path = finder.findPath(oldX, oldY, dX, dY, grid);

    if (this.movementPoints > 0) {
      if (path.length > 1) {
        dungeon.moveEntityTo(this, path[1][0], path[1][1]);
      }

      this.movementPoints -= 1;
    }

    if (dungeon.distanceBetweenEntities(this, dungeon.player) <= 5) {
      this.destinationX = dungeon.player.x;
      this.destinationY = dungeon.player.y;
    }

    if (this.actionPoints > 0) {
      if (dungeon.distanceBetweenEntities(this, dungeon.player) <= 2) {
        dungeon.attackEntity(this, dungeon.player, this.weapon);
      }

      this.actionPoints -= 1;
    }
  },

  refresh() {
    if (dungeon.distanceBetweenEntities(this, dungeon.player) <= 5) {
      dungeon.log(`${this.name} grrrr!!!`);
    }
  },
};

export default wanderer;
