/* eslint-disable import/extensions */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-undef */
import BaseItem from './proto/baseItem.js';
import dungeon from '../dungeon.js';

export default class Sword extends BaseItem {
  constructor(x, y) {
    super(x, y);
    this.tile = 994;
    this.name = 'a sword';
    this.description = 'A basic sword. Causes 1 ~ 5 damage';
    this.weapon = true;

    dungeon.initializeEntity(this);
  }

  damage() {
    return Phaser.Math.Between(1, 5);
  }
}
