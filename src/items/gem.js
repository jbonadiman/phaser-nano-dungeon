/* eslint-disable import/extensions */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-undef */
import GenericItem from './genericItem.js';
import dungeon from '../dungeon.js';

export default class Gem extends GenericItem {
  constructor(x, y) {
    super(x, y);
    this.tile = 720;
    this.name = 'a gem';

    dungeon.initializeEntity(this);
  }
}
