/* eslint-disable import/extensions */
import BaseClass from './proto/baseClass.js';
import Axe from '../items/axe.js';
import Shield from '../items/shield.js';
import dungeon from '../dungeon.js';

export default class Dwarf extends BaseClass {
  constructor(x, y) {
    super(x, y);

    this.name = 'dwarf';
    this.movementPoints = 2;
    this.actionPoints = 2;
    this.healthPoints = 35;
    this.tile = 61;

    this.items.push(new Axe());
    this.toggleItem(0);

    this.items.push(new Shield());
    this.toggleItem(1);

    dungeon.initializeEntity(this);
  }

  refresh() {
    this.movementPoints = 2;
    this.actionPoints = 2;
  }
}
