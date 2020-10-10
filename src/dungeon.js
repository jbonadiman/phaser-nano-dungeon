/* eslint-disable no-param-reassign */
/* eslint-disable no-undef */
/* eslint-disable import/extensions */
import turnManager from './turnManager.js';

const dungeon = {
  msgs: [],
  sprites: {
    floor: 0,
    wall: 554,
  },
  tileSize: 16,

  initialize(scene, level) {
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

  randomWalkableTile() {
    let x = Phaser.Math.Between(0, dungeon.level[0].length - 1);
    let y = Phaser.Math.Between(0, dungeon.level.length - 1);
    let tileAtDestination = dungeon.map.getTileAt(x, y);

    while (typeof tileAtDestination === 'undefined' || tileAtDestination.index === dungeon.sprites.wall) {
      x = Phaser.Math.Between(0, dungeon.level[0].length - 1);
      y = Phaser.Math.Between(0, dungeon.level.length - 1);
      tileAtDestination = dungeon.map.getTileAt(x, y);
    }

    return { x, y };
  },

  randomWalkableTileInRoom(x, y, width, height) {
    let rx = Phaser.Math.Between(x, (x + width) - 1);
    let ry = Phaser.Math.Between(y, (y + height) - 1);

    let tileAtDestination = dungeon.map.getTileAt(rx, ry);
    while (typeof tileAtDestination === 'undefined' || tileAtDestination.index === dungeon.sprites.wall) {
      rx = Phaser.Math.Between(x, (x + width) - 1);
      ry = Phaser.Math.Between(y, (y + height) - 1);

      tileAtDestination = dungeon.map.getTileAt(rx, ry);
    }

    return { x: rx, y: ry };
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
    // Weird bug when killing skeletons:
    /*
    dungeon.js:64 Uncaught TypeError: Cannot read property 'destroy' of undefined
    */
    if (entity.sprite) {
      entity.sprite.destroy();
      delete entity.sprite;
    }

    entity.onDestroy();
    turnManager.entities.delete(entity);
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
      if (entity.tint) {
        entity.sprite.tint = entity.tint;
        entity.sprite.tintFill = true;
      }
    }
  },

  describeEntity(entity) {
    if (entity) {
      const { name } = entity;
      const description = entity.description || '';
      const tags = entity.tags ? entity.tags.map((tag) => `#${tag}`).join(', ') : '';

      dungeon.log(`${name}\n${tags}\n${description}`);
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

  attackEntity(attacker, victim, weapon) {
    attacker.moving = true;
    attacker.tweens = attacker.tweens || 0;
    attacker.tweens += 1;

    const attackMsg = `${attacker.name} does REPL_DAMAGE damage to ${victim.name}.`;

    const rangedAttack = weapon.range() ? weapon.attackTile : false;
    const tint = weapon.range() && weapon.tint ? weapon.tint : false;

    if (!rangedAttack) {
      this.scene.tweens.add({
        targets: attacker.sprite,
        onComplete: () => {
          attacker.sprite.x = this.map.tileToWorldX(attacker.x);
          attacker.sprite.y = this.map.tileToWorldY(attacker.y);
          attacker.moving = false;
          attacker.tweens -= 1;

          const attack = attacker.attack();
          const protection = victim.protection();
          const damage = attack - protection;

          this.log(`${victim.name} defends with ${protection}.`);
          if (damage > 0) {
            victim.healthPoints -= damage;
            this.log(attackMsg.replace('REPL_DAMAGE', damage));

            weapon.executeTag('damagedEntity', victim);

            if (victim.healthPoints <= 0) {
              this.removeEntity(victim);
            }
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
    } else {
      const x = this.map.tileToWorldX(attacker.x);
      const y = this.map.tileToWorldY(attacker.y);
      const sprite = dungeon.scene.add
        .sprite(x, y, 'tiles', rangedAttack)
        .setOrigin(0);

      if (tint) {
        sprite.tint = tint;
        sprite.tintFill = true;
      }

      this.scene.tweens.add({
        targets: sprite,
        onComplete: () => {
          attacker.moving = false;
          attacker.tweens -= 1;

          const attack = attacker.attack();
          const protection = victim.protection();
          const damage = attack - protection;

          this.log(`${victim.name} defends with ${protection}.`);
          if (damage > 0) {
            victim.healthPoints -= damage;
            this.log(attackMsg.replace('REPL_DAMAGE', damage));

            if (victim.healthPoints <= 0) {
              this.removeEntity(victim);
            }
          }
          sprite.destroy();
        },
        x: this.map.tileToWorldX(victim.x),
        y: this.map.tileToWorldY(victim.y),
        ease: 'Power2',
        hold: 20,
        duration: 180,
        delay: attacker.tweens * 200,
      });
    }
  },
  log(text) {
    this.msgs.unshift(text);
    this.msgs = this.msgs.slice(0, 8);
  },
};

export default dungeon;
