/* eslint-disable import/extensions */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-undef */
import GenericItem from './genericItem.js';
import dungeon from '../dungeon.js';

export default class HealthPotion extends GenericItem {
  constructor(x, y) {
    super(x, y);
    this.tile = 761;
    this.name = 'health potion';
    this.description = 'A potion that cures between 3 ~ 5 healthpoints when used';

    dungeon.initializeEntity(this);
  }

  equip(itemNumber) {
    const points = Phaser.Math.Between(3, 5);
    dungeon.log(`A warm feeling is felt when drinking the potion as it restores ${points} healthpoints.`);
    dungeon.player.healthPoints += points;
    dungeon.player.removeItem(itemNumber);
  }
}
