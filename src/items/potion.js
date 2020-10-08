/* eslint-disable import/extensions */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-undef */
import BaseItem from './proto/baseItem.js';
import dungeon from '../dungeon.js';

export default class Potion extends BaseItem {
  constructor(x, y) {
    super(x, y);
    this.tile = 761;
    this.name = 'holy potion';
    this.description = 'A potion that removes cursed items when equipped';

    dungeon.initializeEntity(this);
  }

  equip(itemNumber) {
    dungeon.log('A blessing passes through your body and removes all cursed items.');
    dungeon.player.removeItemByProperty('cursed', true);
    dungeon.player.removeItem(itemNumber);
  }
}
