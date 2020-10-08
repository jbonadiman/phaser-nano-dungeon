const iron = {
  name: 'Iron',
  initialize() {
    this.name = `Iron ${this.name}`;
    this.tint = 0x778899;

    if (this.sprite) {
      this.sprite.tint = this.tint;
      this.sprite.tintFill = true;
    }
  },

  attack(acc = 0) {
    let newAcc = acc;
    if (acc > 0) {
      newAcc += 1;
    }
    return newAcc;
  },

  protection(acc = 0) {
    let newAcc = acc;
    if (acc > 0) {
      newAcc += 1;
    }
    return newAcc;
  },
};

export default iron;
