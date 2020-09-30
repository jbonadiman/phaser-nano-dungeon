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
    let level = [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    const wall = 554;
    const floor = 0;
    level = level.map(r => r.map(t => t == 1 ? wall : floor));

    const tilemapConfig = {
      data: level,
      tileWidth: tileSize,
      tileHeight: tileSize,
    };

    const map = this.make.tilemap(tilemapConfig);
    const tileset = map.addTilesetImage(
      'tiles', 'tiles', tileSize, tileSize, 0, 1);

    const ground = map.createStaticLayer(0, tileset, 0, 0)
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