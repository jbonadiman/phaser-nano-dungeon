/* eslint-disable import/extensions */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-undef */
import GenericItem from './genericItem.js';
import dungeon from '../dungeon.js';

export default class LongSword extends GenericItem {
  constructor(x, y) {
    super(x, y);
    this.tile = 992;
    this.name = 'a longsword';
    this.description = 'A longsword. Causes 1 ~ 8 damage.';
    this.weapon = true;

    dungeon.initializeEntity(this);
  }

  damage() {
    return Phaser.Math.Between(1, 8);
  }
}
