import { defaultLevel, tileSize } from './spriteMappings';

const scene = {
  preload: function () {
    this.load.spritesheet(
      'tiles',
      '../assets/sprite/colored.png',
      {
        frameWidth: 16,
        frameHeight: 16,
        spacing: 1
      });

    // this.load.bitmapFont(
    //   'arcade',
    //   '../assets/font/arcade.png',
    //   '../assets/font/arcade.xml')
  },

  create: function () {
    // this.helloText = this.add
    //   .bitmapText(400, 300, 'arcade', 'Hello Phaser')
    //   .setOrigin(0.5);

    //this.cursors = this.input.keyboard.createCursorKeys();

    const tilemapConfig = {
      data: defaultLevel,
      tileWidth: tileSize,
      tileHeight: tileSize,
    };

    const map = this.make.tilemap(tilemapConfig);
    const tileset = map.addTilesetImage({
      tilesetName: 'tiles',
      key: 'tiles',
      tileWidth: tileSize,
      tileHeight: tileSize,
      tileMargin: 0,
      tileSpacing: 1
    });

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
  scene: scene,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 }
    }
  }
}

const game = new Phaser.Game(config);