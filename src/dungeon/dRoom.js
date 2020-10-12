/* eslint-disable no-undef */
export default class DRoom {
  constructor(area) {
    this.x = Math.floor(area.x + (Phaser.Math.Between(1, area.w) / 3));
    this.y = Math.floor(area.y + (Phaser.Math.Between(1, area.h) / 3));
    this.w = area.w - (this.x - area.x);
    this.h = area.h - (this.y - area.y);

    this.w -= Math.floor(Phaser.Math.Between(1, this.w / 3));
    this.h -= Math.floor(Phaser.Math.Between(1, this.h / 3));
  }
}
