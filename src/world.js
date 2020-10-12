/* eslint-disable no-undef */
/* eslint-disable import/extensions */
import dungeon from './dungeon.js';
import turnManager from './turnManager.js';
import classes from './classes.js';
import { getRandomItem } from './items.js';
import { getRandomEnemy } from './enemies.js';

const world = {
  key: 'world-scene',
  active: true,

  preload() {
    this.load.spritesheet(
      'tiles',
      '../assets/sprite/colored_transparent.png',
      {
        frameWidth: dungeon.tileSize,
        frameHeight: dungeon.tileSize,
        spacing: 1,
      },
    );
  },

  create() {
    this.events.once('dungeon-changed', () => {
      this.scene.restart();
    });

    dungeon.initialize(this);
    const { rooms, stairs } = dungeon;

    if (stairs.down) {
      turnManager.addEntity(new Stairs(stairs.down.x, stairs.down.y, 'down'));
    }

    if (stairs.up) {
      turnManager.addEntity(new Stairs(stairs.up.x, stairs.up.y, 'up'));
    }

    let node = dungeon.tree.left;
    while (node.left !== false) {
      node = node.left;
    }

    const { room } = node.area;

    const playerPos = dungeon.randomWalkableTileInRoom(room.x, room.y, room.w, room.h);

    if (!dungeon.player) {
      dungeon.player = new classes.Elf(playerPos.x, playerPos.y);
    } else {
      dungeon.player.x = playerPos.x;
      dungeon.player.y = playerPos.y;
      dungeon.player.refresh();
      dungeon.initializeEntity(dungeon.player);
    }

    turnManager.addEntity(dungeon.player);

    rooms.forEach((r) => {
      // const area = room.width * room.height;
      let monsterCount = 0;
      let itemCount = 0;

      const roomType = Phaser.Math.RND.weightedPick(
        [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 3],
      );

      switch (roomType) {
        default:
        // empty room
          monsterCount = 0;
          itemCount = 0;
          break;
        case 1:
          // a monster
          monsterCount = 1;
          itemCount = 0;
          break;
        case 2:
          // monster and items.
          monsterCount = 2;
          itemCount = 1;
          break;
        case 3:
          // treasure room.
          monsterCount = 0;
          itemCount = 5;
          break;
      }

      while (monsterCount > 0) {
        const tile = dungeon.randomWalkableTileInRoom(r.x, r.y, r.w, r.h);
        turnManager.addEntity(getRandomEnemy(tile.x, tile.y));
        monsterCount -= 1;
      }

      while (itemCount > 0) {
        const tile = dungeon.randomWalkableTileInRoom(r.x, r.y, r.w, r.h);
        turnManager.addEntity(getRandomItem(tile.x, tile.y));
        itemCount -= 1;
      }
    });

    const camera = this.cameras.main;
    camera.setViewport(0, 0, camera.worldView.width - 220, camera.worldView.height);
    camera.setBounds(0, 0, camera.worldView.width, camera.worldView.height);
    camera.startFollow(dungeon.player.sprite);

    this.events.emit('createUI');
  },

  update() {
    if (turnManager.over()) turnManager.refresh();

    turnManager.turn();
  },
};

export default world;
