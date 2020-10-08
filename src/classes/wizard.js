/* eslint-disable import/extensions */
import BaseClass from './proto/baseClass.js';
import ScrollOfFireball from '../items/scrollOfFireball.js';
import ScrollOfLightning from '../items/scrollOfLightning.js';
import HealthPotion from '../items/healthPotion.js';
import dungeon from '../dungeon.js';

export default class Wizard extends BaseClass {
  constructor(x, y) {
    super(x, y);

    this.name = 'wizard';
    this.movementPoints = 3;
    this.actionPoints = 1;
    this.healthPoints = 20;
    this.tile = 88;

    this.items.push(new ScrollOfFireball());
    this.items.push(new ScrollOfLightning());
    this.items.push(new HealthPotion());
    this.items.push(new HealthPotion());
    this.toggleItem(1);

    dungeon.initializeEntity(this);
  }

  refresh() {
    this.movementPoints = 3;
    this.actionPoints = 1;
  }
}
