import dungeon from './dungeon.js'
import turnManager from './turnManager.js'
import Player from './player.js'

const tileSize = 16;

const scene = {
  preload: function () {
    this.load.spritesheet(
      'tiles',
      '../assets/sprite/colored.png',
      {
        frameWidth: tileSize,
        frameHeight: tileSize,
        spacing: 1
      });
  },

  create: function () {
    dungeon.initialize(this);
    const player = new Player(15, 15);
    turnManager.addEntity(player);
  },

  update: function() {
    if (turnManager.over()) turnManager.refresh();

    turnManager.turn();
  }
}

const config = {
  type: Phaser.AUTO,
  width: 80 * tileSize,
  height: 50 * tileSize,
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