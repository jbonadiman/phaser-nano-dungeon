/* eslint-disable import/extensions */
import dungeon from '../dungeon.js';
import BaseEnemy from './proto/baseEnemy.js';

export default class Troll extends BaseEnemy {
  constructor(x, y) {
    super(x, y);
    this.name = 'Troll';
    this.movementPoints = 2;
    this.actionPoints = 1;
    this.healthPoints = 8;
    this.refreshRates = {
      movementPoints: 2,
      actionPoints: 1,
      healthPoints: 0,
    };

    this.damage = {
      min: 3,
      max: 6,
    };

    this.x = x;
    this.y = y;
    this.tile = 286;
    this.type = 'enemy';
    this.weapon.name = 'club';

    dungeon.initializeEntity(this);
  }
}
