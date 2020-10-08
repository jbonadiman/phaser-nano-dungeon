/* eslint-disable no-undef */

const royal = {
  name: 'Royal',
  initialize() {
    if (this.type === 'enemy') {
      this.tint = 0xccbc00;
      this.refreshRates.actionPoints += 2;
      this.refreshRates.movementPoints += 2;
      this.refreshRates.healthPoints += 1;

      if (this.sprite) {
        this.sprite.tint = this.tint;
        this.sprite.tintFill = true;
      }

      const title = Phaser.Utils.Array.GetRandom([
        'Count', 'Duke', 'Lord', 'Duchess', 'Baron', 'Baroness', 'Countess',
      ]);
      const suffix = Phaser.Utils.Array.GetRandom([
        'ah', 'oz', 'von', 'zits', 'gres',
      ]);

      this.name = `${title} ${this.name.slice(0, this.name.length - 2)}${suffix}`;
    }
  },
};

export default royal;
