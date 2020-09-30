const wall = 554;
const floor = 0;
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
    const level = [
      [wall, wall, wall, wall, wall, wall, wall, wall, wall, wall],
      [wall, floor, floor, floor, floor, floor, floor, floor, floor, wall],
      [wall, floor, floor, floor, floor, floor, floor, floor, floor, wall],
      [wall, floor, floor, floor, floor, floor, floor, floor, floor, wall],
      [wall, floor, floor, floor, floor, floor, floor, floor, floor, wall],
      [wall, floor, floor, floor, floor, floor, floor, floor, floor, wall],
      [wall, floor, floor, floor, floor, floor, floor, floor, floor, wall],
      [wall, floor, floor, floor, floor, floor, floor, floor, floor, wall],
      [wall, floor, floor, floor, floor, floor, floor, floor, floor, wall],
      [wall, wall, wall, wall, wall, wall, wall, wall, wall, wall],
    ];

    const tilemapConfig = {
      data: level,
      tileWidth: tileSize,
      tileHeight: tileSize,
    };

    const map = this.make.tilemap(tilemapConfig);
    const tileset = map.addTilesetImage(
      'tiles', 'tiles', tileSize, tileSize, floor, 1);

    const ground = map.createStaticLayer(floor, tileset, floor, 0)
  },

  update: function() {
  }
}

const config = {
  type: Phaser.AUTO,
  width: 80 * tileSize,
  height: 50 * tileSize,
  backgroundColor: '#000',
  parent: 'game',
  pixelArt: true,
  zoom: 2,
  scene: scene,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 }
    }
  }
}

const game = new Phaser.Game(config);