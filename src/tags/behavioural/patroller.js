/* eslint-disable no-undef */
/* eslint-disable import/extensions */
import dungeon from '../../dungeon.js';

const patroller = {
  name: 'Patroller',
  initialize() {
    if (this.type === 'enemy') {
      this.tint = 0xdd00cd;
      if (this.sprite) {
        this.sprite.tint = this.tint;
        this.sprite.tintFill = true;
      }

      this.initialX = this.x;
      this.initialY = this.y;

      const randomCoords = dungeon.randomWalkableTile();
      this.destinationX = randomCoords.x;
      this.destinationY = randomCoords.y;

      this.targetX = this.destinationX;
      this.targetY = this.destinationY;
    }
  },

  turn() {
    const oldX = this.x;
    const oldY = this.y;

    if (oldX === this.initialX && oldY === this.initialY) {
      this.targetX = this.destinationX;
      this.targetY = this.destinationY;
    }

    if (oldX === this.destinationX && oldY === this.destinationY) {
      this.targetX = this.initialX;
      this.targetY = this.initialY;
    }

    // eslint-disable-next-line no-console
    console.log(`${this.name} patrolling to ${this.targetX},${this.targetY}`);

    const grid = new PF.Grid(dungeon.level);
    const finder = new PF.AStarFinder();
    const path = finder.findPath(oldX, oldY, this.targetX, this.targetY, grid);

    if (this.movementPoints > 0) {
      if (path.length > 1) {
        dungeon.moveEntityTo(this, path[1][0], path[1][1]);
      }

      this.movementPoints -= 1;
    }

    if (dungeon.distanceBetweenEntities(this, dungeon.player) <= 5) {
      this.targetX = dungeon.player.x;
      this.targetY = dungeon.player.y;
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
      dungeon.log(`${this.name} raaawwrr!!!`);
    }
  },
};

export default patroller;
