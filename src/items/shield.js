/* eslint-disable class-methods-use-this */
/* eslint-disable import/extensions */
import BaseItem from './proto/baseItem.js';
import dungeon from '../dungeon.js';

export default class Shield extends BaseItem {
  constructor(x, y) {
    super(x, y);
    this.tile = 776;
    this.name = 'shield';
    this.description = 'A basic shield. Gives +1 protection';

    dungeon.initializeEntity(this);
  }

  protection() {
    return 1;
  }
}
