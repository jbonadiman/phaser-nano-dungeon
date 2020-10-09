/* eslint-disable no-undef */
export default class DRoom {
  constructor(area) {
    this.x = Math.floor(area.x + (Phaser.Math.Between(1, area.width) / 3));
    this.y = Math.floor(area.y + (Phaser.Math.Between(1, area.height) / 3));
    this.width = area.width - (this.x - area.x);
    this.height = area.height - (this.y - area.y);

    this.width -= Math.floor(Phaser.Math.Between(1, this.width / 3));
    this.height -= Math.floor(Phaser.Math.Between(1, this.height / 3));
  }
}
