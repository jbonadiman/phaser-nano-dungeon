/* eslint-disable import/extensions */
import dungeon from './dungeon.js';
import turnManager from './turnManager.js';
import classes from './classes.js';
import Skeleton from './enemies/skeleton.js';
import CursedGem from './items/cursedGem.js';
import Gem from './items/gem.js';
import LongSword from './items/longSword.js';
import Potion from './items/potion.js';

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
    dungeon.player = new classes.Warrior(15, 15);
    turnManager.addEntity(dungeon.player);
    turnManager.addEntity(new Skeleton(20, 20));
    turnManager.addEntity(new Skeleton(20, 10));
    turnManager.addEntity(new Skeleton(76, 10));
    turnManager.addEntity(new Skeleton(29, 24));
    turnManager.addEntity(new Skeleton(29, 20));

    turnManager.addEntity(dungeon.player);
    turnManager.addEntity(new Skeleton(20, 20));
    turnManager.addEntity(new Skeleton(20, 10));
    turnManager.addEntity(new CursedGem(15, 20));
    turnManager.addEntity(new Potion(18, 18));
    turnManager.addEntity(new LongSword(18, 22));
    turnManager.addEntity(new Gem(21, 21));
    turnManager.addEntity(new Skeleton(76, 10));
    turnManager.addEntity(new Skeleton(29, 24));
    turnManager.addEntity(new Skeleton(29, 20));

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
