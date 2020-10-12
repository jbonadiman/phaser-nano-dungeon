/* eslint-disable import/extensions */
/* eslint-disable no-undef */
import DArea from './dArea.js';
import DNode from './dNode.js';
import DRoom from './dRoom.js';

function splitArea(area) {
  let x1;
  let y1;
  let w1;
  let h1;

  let x2;
  let y2;
  let w2;
  let h2;

  if (Phaser.Math.Between(0, 1) === 0) {
    const divider = Phaser.Math.Between(1, area.w);

    x1 = area.x;
    y1 = area.y;
    w1 = divider;
    h1 = area.h;

    x2 = area.x + w1;
    y2 = area.y;
    w2 = area.w - w1;
    h2 = area.h;

    if (w1 / h1 < 0.4 || w2 / h2 < 0.4) {
      return splitArea(area);
    }
  } else {
    const divider = Phaser.Math.Between(1, area.h);

    x1 = area.x;
    y1 = area.y;
    w1 = area.w;
    h1 = divider;

    x2 = area.x;
    y2 = area.y + h1;
    w2 = area.w;
    h2 = area.h - h1;

    if (h1 / w1 < 0.4 || h2 / w2 < 0.4) {
      return splitArea(area);
    }
  }

  return [
    new DArea(x1, y1, w1, h1),
    new DArea(x2, y2, w2, h2),
  ];
}

function makeTree(area, iterations) {
  const root = new DNode(area);

  if (iterations !== 0) {
    const [a1, a2] = splitArea(root.area);
    root.left = makeTree(a1, iterations - 1);
    root.right = makeTree(a2, iterations - 1);
  }

  return root;
}

export default class BSPLevel {
  constructor(width, height, iterations) {
    this.rootArea = new DArea(0, 0, width, height);
    this.tree = makeTree(this.rootArea, iterations);

    this.initializeLevelData();
    this.makeRooms();
    this.makeCorridors();
  }

  initializeLevelData() {
    const level = [];

    for (let y = 0; y <= this.rootArea.h; y += 1) {
      level[y] = level[y] || [];

      for (let x = 0; x <= this.rootArea.w; x += 1) {
        level[y][x] = 1;
      }
    }

    this.levelData = level;
  }

  fillRect(x, y, w, h, tile) {
    for (let y1 = y; y1 < y + h; y1 += 1) {
      for (let x1 = x; x1 < x + w; x1 += 1) {
        this.levelData[y1][x1] = tile;
      }
    }
  }

  line(x1, y1, x2, y2, tile) {
    for (let y = y1; y <= y2; y += 1) {
      for (let x = x1; x <= x2; x += 1) {
        this.levelData[y][x] = tile;
      }
    }
  }

  makeRooms() {
    this.tree.forEachLeaf((area) => {
      // eslint-disable-next-line no-param-reassign
      area.room = new DRoom(area);
      this.fillRect(area.room.x, area.room.y, area.room.w, area.room.h, 0);
    });
  }

  makeCorridors() {
    const makePath = (node) => {
      if (node.left && node.right) {
        const x1 = Math.floor(node.left.area.x + (node.left.area.w / 2));
        const y1 = Math.floor(node.left.area.y + (node.left.area.h / 2));

        const x2 = Math.floor(node.right.area.x + (node.right.area.w / 2));
        const y2 = Math.floor(node.right.area.y + (node.right.area.h / 2));

        this.line(x1, y1, x2, y2, 0);

        makePath(node.left);
        makePath(node.right);
      }
    };

    makePath(this.tree);
  }

  toLevelData() {
    return this.levelData;
  }

  getRooms() {
    const rooms = [];
    this.tree.forEachLeaf((area) => {
      rooms.push(area.room);
    });

    return rooms;
  }

  addStairs() {
    // Place stairs down in the room at the
    // right-most tree node.
    let node = this.tree.right;
    while (node.right !== false) {
      node = node.right;
    }

    let { room } = node.area;

    this.down = {
      x: Phaser.Math.Between(room.x + 1, room.x + room.w - 1),
      y: Phaser.Math.Between(room.y + 1, room.y + room.h - 1),
    };

    // Place stairs up in the room at the
    // left-most tree node.
    node = this.tree.left;
    while (node.left !== false) {
      node = node.left;
    }

    room = node.area.room;

    this.up = {
      x: Phaser.Math.Between(room.x + 1, room.x + room.w - 1),
      y: Phaser.Math.Between(room.y + 1, room.y + room.h - 1),
    };
  }
}
