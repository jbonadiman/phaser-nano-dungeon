/* eslint-disable import/extensions */
import BaseClass from './proto/baseClass.js';
import Bow from '../items/bow.js';
import dungeon from '../dungeon.js';

export default class Elf extends BaseClass {
  constructor(x, y) {
    super(x, y);

    this.name = 'elf';
    this.movementPoints = 4;
    this.actionPoints = 3;
    this.healthPoints = 20;
    this.tile = 56;

    this.items.push(new Bow());
    this.toggleItem(0);

    dungeon.initializeEntity(this);
  }

  refresh() {
    this.movementPoints = 4;
    this.actionPoints = 3;
  }
}
