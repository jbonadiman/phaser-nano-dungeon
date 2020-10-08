/* eslint-disable no-undef */
/* eslint-disable class-methods-use-this */
/* eslint-disable import/extensions */
import BaseItem from './proto/baseItem.js';
import dungeon from '../dungeon.js';

export default class Hammer extends BaseItem {
  constructor(x, y) {
    super(x, y);
    this.tile = 933;
    this.name = 'warhammer';
    this.description = 'A basic warhammer. Causes 3 ~ 8 damage';
    this.weapon = true;

    dungeon.initializeEntity(this);
  }

  damage() {
    return Phaser.Math.Between(3, 8);
  }
}
