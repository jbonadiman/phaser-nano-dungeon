/* eslint-disable import/extensions */
import dungeon from './dungeon.js';
import BSPDungeon from './dungeon/bspDungeon.js';
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
    const dg = new BSPDungeon(80, 50, 4);
    const level = dg.toLevelData();
    dungeon.initialize(this, level);

    const playerPos = dungeon.randomWalkableTile();

    dungeon.player = new classes.Wizard(playerPos.x, playerPos.y);
    turnManager.addEntity(dungeon.player);

    let monsterCount = 10;
    while (monsterCount > 0) {
      const tile = dungeon.randomWalkableTile();
      turnManager.addEntity(getRandomEnemy(tile.x, tile.y));
      monsterCount -= 1;
    }

    let itemCount = 10;
    while (itemCount > 0) {
      const tile = dungeon.randomWalkableTile();
      turnManager.addEntity(getRandomItem(tile.x, tile.y));
      itemCount -= 1;
    }

    const camera = this.cameras.main;
    camera.setViewport(0, 0, camera.worldView.width - 200, camera.worldView.height);
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
