/* eslint-disable no-param-reassign */
/* eslint-disable no-undef */
/* eslint-disable import/extensions */
import level from './level.js';
import turnManager from './turnManager.js';

const dungeon = {
  msgs: [],
  sprites: {
    floor: 0,
    wall: 554,
  },
  tileSize: 16,

  initialize(scene) {
    this.scene = scene;
    this.level = level;

    this.levelWithTiles = level.map(
      (row) => row.map((tile) => (tile === 1 ? this.sprites.wall : this.sprites.floor)),
    );

    const config = {
      data: this.levelWithTiles,
      tileWidth: this.tileSize,
      tileHeight: this.tileSize,
    };

    const map = scene.make.tilemap(config);
    const tileset = map.addTilesetImage(
      'tiles', 'tiles', this.tileSize, this.tileSize, 0, 1,
    );

    this.map = map.createDynamicLayer(0, tileset, 0, 0);
  },

  isWalkableTile(x, y) {
    const allEntities = [...turnManager.entities];
    for (let i = 0; i < allEntities.length; i += 1) {
      const entity = allEntities[i];

      if (entity.sprite && entity.x === x && entity.y === y) {
        return false;
      }
    }

    return dungeon.map.getTileAt(x, y).index !== dungeon.sprites.wall;
  },

  entityAtTile(x, y) {
    const allEntities = [...turnManager.entities];
    for (let i = 0; i < allEntities.length; i += 1) {
      const entity = allEntities[i];

      if (entity.sprite && entity.x === x && entity.y === y) {
        return entity;
      }
    }

    return false;
  },

  removeEntity(entity) {
    turnManager.entities.delete(entity);
    entity.sprite.destroy();
    delete entity.sprite;
    entity.onDestroy();
  },

  itemPicked(entity) {
    entity.sprite.destroy();
    delete entity.sprite;
  },

  initializeEntity(entity) {
    if (entity.x && entity.y) {
      const x = this.map.tileToWorldX(entity.x);
      const y = this.map.tileToWorldY(entity.y);

      entity.sprite = this.scene.add.sprite(x, y, 'tiles', entity.tile);
      entity.sprite.setOrigin(0);
    }
  },

  moveEntityTo(entity, x, y) {
    entity.moving = true;
    entity.x = x;
    entity.y = y;

    this.scene.tweens.add({
      targets: entity.sprite,
      onComplete: () => {
        entity.moving = false;
      },
      x: this.map.tileToWorldX(x),
      y: this.map.tileToWorldY(y),
      ease: 'Power2',
      duration: 100,
    });
  },

  distanceBetweenEntities(entity, otherEntity) {
    const grid = new PF.Grid(dungeon.level);
    const finder = new PF.AStarFinder({
      allowDiagonal: true,
    });
    const path = finder.findPath(
      entity.x,
      entity.y,
      otherEntity.x,
      otherEntity.y,
      grid,
    );

    if (path.length >= 2) {
      return path.length;
    }
    return false;
  },

  attackEntity(attacker, victim) {
    attacker.moving = true;
    attacker.tweens = attacker.tweens || 0;
    attacker.tweens += 1;

    this.scene.tweens.add({
      targets: attacker.sprite,
      onComplete: () => {
        attacker.sprite.x = this.map.tileToWorldX(attacker.x);
        attacker.sprite.y = this.map.tileToWorldX(attacker.y);
        attacker.moving = false;
        attacker.tweens -= 1;

        const damage = attacker.attack();
        victim.healthPoints -= damage;

        this.log(`${attacker.name} does ${damage} damage to ${victim.name} which now has ${victim.healthPoints} life left`);

        if (victim.healthPoints <= 0) {
          this.removeEntity(victim);
        }
      },
      x: this.map.tileToWorldX(victim.x),
      y: this.map.tileToWorldY(victim.y),
      ease: 'Power2',
      hold: 20,
      duration: 80,
      delay: attacker.tweens * 200,
      yoyo: true,
    });
  },
  log(text) {
    this.msgs.unshift(text);
    this.msgs = this.msgs.slice(0, 8);
  },
};

export default dungeon;
