import dungeon from './dungeon.js'
import turnManager from './turnManager.js'
import Player from './player.js'
import BasicMonster from './monster.js'

//const tileSize = 16;

const scene = {
  preload: function () {
    this.load.spritesheet(
      'tiles',
      '../assets/sprite/colored.png',
      {
        frameWidth: dungeon.tileSize,
        frameHeight: dungeon.tileSize,
        spacing: 1
      });
  },

  create: function () {
    dungeon.initialize(this);
    dungeon.player = new Player(15, 15);
    turnManager.addEntity(dungeon.player);
    turnManager.addEntity(new BasicMonster(70, 8));
  },

  update: function() {
    if (turnManager.over()) turnManager.refresh();

    turnManager.turn();
  }
}

const config = {
  type: Phaser.AUTO,
  width: 80 * dungeon.tileSize,
  height: 50 * dungeon.tileSize,
  backgroundColor: '#000',
  parent: 'game',
  pixelArt: true,
  zoom: 1,
  scene: scene,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 }
    }
  }
}

const game = new Phaser.Game(config);