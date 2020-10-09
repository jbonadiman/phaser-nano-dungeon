export default class DNode {
  constructor(area) {
    this.left = false;
    this.right = false;
    this.area = area;
  }

  forEachArea(f) {
    f(this.area);

    if (this.left) this.left.forEachArea(f);
    if (this.right) this.right.forEachArea(f);
  }

  forEachLeaf(f) {
    if (!this.left && !this.right) {
      f(this.area);
    }

    if (this.left) this.left.forEachLeaf(f);
    if (this.right) this.right.forEachLeaf(f);
  }
}
