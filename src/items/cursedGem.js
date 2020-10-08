/* eslint-disable import/extensions */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-undef */
import BaseItem from './proto/baseItem.js';
import dungeon from '../dungeon.js';

export default class CursedGem extends BaseItem {
  constructor(x, y) {
    super(x, y);
    this.tile = 720;
    this.name = 'cursed gem';
    this.description = 'A cursed gem that is now stuck in your hand. You can only remove it by finding a potion';
    this.actionPoints = 1;
    this.cursed = true;

    dungeon.initializeEntity(this);
  }

  turn() {
    const nameCapitalized = this.name.charAt(0).toUpperCase() + this.name.slice(1);

    if (dungeon.player.items.includes(this)) {
      this.active = true;
      dungeon.log(`${nameCapitalized} gives 1 damage to ${dungeon.player.name}. Find potion to cure.`);
      dungeon.player.healthPoints -= 1;
    }

    this.actionPoints = 0;
  }

  refresh() {
    this.actionPoints = 1;
  }

  over() {
    return this.actionPoints === 0;
  }
}
