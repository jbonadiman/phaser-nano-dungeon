/* eslint-disable import/extensions */
import GenericClass from './genericClass.js';
import Sword from '../items/sword.js';
import dungeon from '../dungeon.js';

export default class Warrior extends GenericClass {
  constructor(x, y) {
    super(x, y);

    this.name = 'warrior';
    this.movementPoints = 3;
    this.actionPoints = 2;

    this.items.push(new Sword());
    this.toggleItem(0);

    dungeon.initializeEntity(this);
  }

  refresh() {
    this.movementPoints = 3;
    this.actionPoints = 2;
  }
}
