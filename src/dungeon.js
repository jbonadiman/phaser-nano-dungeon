import level from './level.js'

const dungeon = {
  sprites = {
    floor: 0,
    wall: 554,
  },
  
  initialize(scene) {
    this.scene = scene
    scene.level = level.map(
      row => row.map(tile => tile == 1 ? this.sprites.wall : this.sprites.floor)
    )

    const tileSize = 16
    const config = {
        data: scene.level,
        tileWidth: tileSize,
        tileHeight: tileSize,
    }
    const map = scene.make.tilemap(config)
    const tileset = map.addTilesetImage(
      'tiles', 'tiles', tileSize, tileSize, 0, 1)
    this.map = map.createDynamicLayer(0, tileset, 0, 0)
  },
}

export default dungeon;