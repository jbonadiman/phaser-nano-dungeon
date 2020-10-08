/* eslint-disable import/extensions */
import BaseClass from './proto/baseClass.js';
import Hammer from '../items/hammer.js';
import dungeon from '../dungeon.js';

export default class Cleric extends BaseClass {
  constructor(x, y) {
    super(x, y);

    this.name = 'cleric';
    this.movementPoints = 3;
    this.actionPoints = 2;
    this.healthPoints = 40;
    this.tile = 31;

    this.items.push(new Hammer());
    this.toggleItem(0);

    dungeon.initializeEntity(this);
  }

  refresh() {
    this.movementPoints = 3;
    this.actionPoints = 2;

    if (this.healthPoints < 40) {
      this.healthPoints += 1;
      dungeon.log(`${this.name} heals 1 hp.`);
    }
  }
}
