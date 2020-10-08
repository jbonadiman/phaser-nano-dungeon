/* eslint-disable import/extensions */
import dungeon from '../dungeon.js';

const poison = {
  name: 'Poison',
  initialize(damage = 1, durationInTurns = 10) {
    this.poisonDamage = damage;
    this.duration = durationInTurns;

    if (this.type === 'item') {
      this.tint = 0x7CFC00;
      if (this.sprite) {
        this.sprite.tint = this.tint;
        this.sprite.tintFill = true;
      }
    }
  },

  turn() {
    if (this.type !== 'item') {
      if (this.duration > 0 && !this.poisonActivated) {
        this.poisonActivated = true;
        this.healthPoints -= this.poisonDamage;
        this.duration -= 1;
        dungeon.log(`${this.name} suffers ${this.poisonDamage} hits from poison.`);
      }

      if (this.duration === 0) {
        this.removeTag(poison);
      }
    }
  },

  refresh() {
    this.poisonActivated = false;
  },

  damagedEntity(entity) {
    entity.addTag(poison);
    return entity;
  },
};

export default poison;
