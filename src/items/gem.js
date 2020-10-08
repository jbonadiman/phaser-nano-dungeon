/* eslint-disable import/extensions */
import BaseItem from './proto/baseItem.js';
import dungeon from '../dungeon.js';

export default class Gem extends BaseItem {
  constructor(x, y) {
    super(x, y);
    this.tile = 720;
    this.name = 'a gem';

    dungeon.initializeEntity(this);
  }
}
