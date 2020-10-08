/* eslint-disable no-undef */
/* eslint-disable class-methods-use-this */
/* eslint-disable import/extensions */
import BaseItem from './proto/baseItem.js';
import dungeon from '../dungeon.js';

export default class ScrollOfLightning extends BaseItem {
  constructor(x, y) {
    super(x, y);
    this.tile = 881;
    this.tint = 0x0022ff;
    this.attackTile = 413;
    this.name = 'scroll of lightning';
    this.description = 'A scroll of lightning. Causes 1 ~ 2 damage. 7 tiles range';
    this.weapon = true;

    dungeon.initializeEntity(this);
  }

  damage() {
    return Phaser.Math.Between(1, 2);
  }

  range() {
    return 7;
  }
}
