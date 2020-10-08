/* eslint-disable no-undef */
/* eslint-disable class-methods-use-this */
/* eslint-disable import/extensions */
import BaseItem from './proto/baseItem.js';
import dungeon from '../dungeon.js';

export default class Axe extends BaseItem {
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
