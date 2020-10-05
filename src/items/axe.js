/* eslint-disable no-undef */
/* eslint-disable class-methods-use-this */
/* eslint-disable import/extensions */
import GenericItem from './genericItem.js';
import dungeon from '../dungeon.js';

export default class Axe extends GenericItem {
  constructor(x, y) {
    super(x, y);
    this.tile = 934;
    this.name = 'axe';
    this.description = 'A basic axe. Causes 2 ~ 7 damage';
    this.weapon = true;

    dungeon.initializeEntity(this);
  }

  damage() {
    return Phaser.Math.Between(2, 7);
  }
}
