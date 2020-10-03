/* eslint-disable import/extensions */
import dungeon from './dungeon.js';
import turnManager from './turnManager.js';
import Player from './player.js';
import BasicMonster from './monster.js';

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
    dungeon.initialize(this);
    dungeon.player = new Player(15, 15);
    turnManager.addEntity(dungeon.player);
    turnManager.addEntity(new BasicMonster(20, 20));
    turnManager.addEntity(new BasicMonster(20, 10));
    turnManager.addEntity(new BasicMonster(76, 10));
    turnManager.addEntity(new BasicMonster(29, 24));
    turnManager.addEntity(new BasicMonster(29, 20));

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
