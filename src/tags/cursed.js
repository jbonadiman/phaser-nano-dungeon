/* eslint-disable import/extensions */
import dungeon from '../dungeon.js';

const poison = {
  name: 'Cursed',
  initialize(damage = 1, durationInTurns = 5) {
    this.curseDamage = damage;
    this.duration = durationInTurns;

    if (this.type === 'item') {
      this.tint = 0x000000;
      if (this.sprite) {
        this.sprite.tint = this.tint;
        this.sprite.tintFill = true;
      }
    }
  },

  turn() {
    if (this.type !== 'item') {
      if (this.duration > 0 && !this.curseActivated) {
        this.curseActivated = true;
        this.healthPoints -= this.curseDamage;
        this.duration -= 1;
        dungeon.log(`${this.name} suffers ${this.curseDamage} hits from curse.`);
      }

      if (this.duration === 0) {
        this.removeTag(poison);
      }
    }
  },

  refresh() {
    this.curseActivated = false;
  },

  damagedEntity(entity) {
    entity.addTag(poison);
    return entity;
  },
};

export default poison;
