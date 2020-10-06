/* eslint-disable no-undef */
/* eslint-disable class-methods-use-this */
/* eslint-disable import/extensions */
import GenericItem from './genericItem.js';
import dungeon from '../dungeon.js';

export default class Bow extends GenericItem {
  constructor(x, y) {
    super(x, y);
    this.tile = 901;
    this.attackTile = 872;
    this.name = 'bow';
    this.description = 'A bow and arrows. Causes 1 ~ 3 damage. 5 tiles range';
    this.weapon = true;

    dungeon.initializeEntity(this);
  }

  damage() {
    return Phaser.Math.Between(1, 3);
  }

  range() {
    return 5;
  }
}
