/* eslint-disable import/extensions */
import dungeon from '../dungeon.js';

const burning = {
  name: 'Burning',
  initialize(damage = 2, durationInTurns = 3) {
    this.burnDamage = damage;
    this.duration = durationInTurns;

    if (this.type === 'item') {
      this.tint = 0xFF4500;
      if (this.sprite) {
        this.sprite.tint = this.tint;
        this.sprite.tintFill = true;
      }
    }
  },

  turn() {
    if (this.type !== 'item') {
      if (this.duration > 0 && !this.burnActivated) {
        this.burnActivated = true;
        this.healthPoints -= this.burnDamage;
        this.duration -= 1;
        dungeon.log(`${this.name} suffers ${this.burnDamage} hits from burning.`);
      }

      if (this.duration === 0) {
        this.removeTag(burning);
      }
    }
  },

  refresh() {
    this.burnActivated = false;
  },

  damagedEntity(entity) {
    entity.addTag(burning);
    return entity;
  },
};

export default burning;
