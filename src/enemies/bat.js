/* eslint-disable import/extensions */
import dungeon from '../dungeon.js';
import BaseEnemy from './proto/baseEnemy.js';

export default class Bat extends BaseEnemy {
  constructor(x, y) {
    super(x, y);
    this.name = 'Bat';
    this.movementPoints = 5;
    this.actionPoints = 1;
    this.healthPoints = 2;
    this.refreshRates = {
      movementPoints: 5,
      actionPoints: 1,
      healthPoints: 0,
    };

    this.damage = {
      min: 1,
      max: 3,
    };

    this.x = x;
    this.y = y;
    this.tile = 282;
    this.type = 'enemy';
    this.weapon.name = 'bite';

    dungeon.initializeEntity(this);
  }
}
