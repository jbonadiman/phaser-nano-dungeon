/* eslint-disable import/extensions */
import BSPLevel from './bspLevel.js';

export default class BSPDungeon {
  constructor(config) {
    const levels = [];
    for (let c = 0; c < config.levels; c += 1) {
      levels.push(new BSPLevel(config.width, config.height, config.iterations));
    }

    this.levels = levels;
    this.currentLevel = 0;
  }

  goDown() {
    if (this.currentLevel < this.levels.length - 1) {
      this.currentLevel += 1;
    } else {
      // eslint-disable-next-line no-console
      console.error("can't go down, already at the bottom of the dungeon.");
    }
  }

  goUp() {
    if (this.currentLevel > 0) {
      this.currentLevel -= 1;
    } else {
      // eslint-disable-next-line no-console
      console.error("can't go up, already at the top of the dungeon.");
    }
  }

  getCurrentLevel() {
    return this.levels[this.currentLevel].toLevelData();
  }

  getRooms() {
    return this.levels[this.currentLevel].getRooms();
  }

  getTree() {
    return this.levels[this.currentLevel].tree;
  }

  getStairs() {
    const stairs = {};

    if (this.currentLevel < this.levels.length - 1) {
      stairs.down = this.levels[this.currentLevel].down;
    }

    if (this.currentLevel > 0) {
      stairs.up = this.levels[this.currentLevel].up;
    }

    return stairs;
  }
}
