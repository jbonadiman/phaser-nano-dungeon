/* eslint-disable class-methods-use-this */
export default class GenericItem {
  constructor(x, y) {
    this.active = false;
    this.type = 'item';
    this.weapon = false;
    this.name = 'Unknown Item';
    this.description = 'it is nothing special';

    if (x && y) {
      this.x = x;
      this.y = y;
    }
  }

  damage() { return 0; }

  turn() { }

  equip() { }

  unequip() { }

  refresh() { }

  over() { return true; }

  createUI() { return 0; }
}