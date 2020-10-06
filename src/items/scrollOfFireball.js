/* eslint-disable no-undef */
/* eslint-disable class-methods-use-this */
/* eslint-disable import/extensions */
import GenericItem from './genericItem.js';
import dungeon from '../dungeon.js';

export default class ScrollOfFireball extends GenericItem {
  constructor(x, y) {
    super(x, y);
    this.tile = 881;
    this.tint = 0xdd0000;
    this.attackTile = 335;
    this.name = 'scroll of fireball';
    this.description = 'A scroll of fireball. Causes 1 ~ 4 damage. 4 tiles range';
    this.weapon = true;

    dungeon.initializeEntity(this);
  }

  damage() {
    return Phaser.Math.Between(1, 4);
  }

  range() {
    return 4;
  }
}
