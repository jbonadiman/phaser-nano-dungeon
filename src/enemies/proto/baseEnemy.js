/* eslint-disable no-undef */
/* eslint-disable import/extensions */
import dungeon from '../../dungeon.js';
import turnManager from '../../turnManager.js';
import Taggable from '../../taggable.js';
import { getRandomItem } from '../../items.js';
import BaseItem from '../../items/proto/baseItem';

export default class BaseEnemy extends Taggable {
  constructor(x, y) {
    super(x, y);
    this.name = 'base enemy';
    this.movementsPoints = 1;
    this.actionPoints = 1;
    this.healthPoints = 1;
    this.maxHealthPoints = this.healthPoints;
    this.moving = false;
    this.weapon = new BaseItem();

    this.refreshRates = {
      movementPoints: 1,
      actionPoints: 1,
      healthPoints: 0,
    };

    this.damage = {
      min: 1,
      max: 4,
    };

    this.defense = {
      min: 0,
      max: 0,
    };

    this.loot = [];
    this.x = x;
    this.y = y;
    this.tile = 26;
    this.type = 'enemy';
  }

  refresh() {
    this.movementsPoints = this.refreshRates.movementPoints;
    this.actionPoints = this.refreshRates.actionPoints;
    if (this.refreshRates.healthPoints > 0 && this.healthPoints <= this.maxHealthPoints) {
      this.healthPoints += this.refreshRates.healthPoints;
    }
  }

  attack() {
    return Phaser.Math.Between(this.damage.min, this.damage.max);
  }

  protection() {
    return Phaser.Math.Between(this.defense.min, this.defense.max);
  }

  // eslint-disable-next-line class-methods-use-this
  turn() {}

  over() {
    const isOver = this.movementsPoints === 0 && this.actionPoints === 0 && !this.moving;
    if (isOver && this.UItext) {
      this.UItext.setColor('#cfc6b8');
    } else {
      this.UItext.setColor('#fff');
    }

    return isOver;
  }

  onDestroy() {
    dungeon.log(`${this.name} was killed.`);
    this.UIsprite.setAlpha(0.2);
    this.UItext.setAlpha(0.2);

    const { x, y } = this;
    const item = getRandomItem(x, y, 1, 1);

    turnManager.addEntity(item);
    dungeon.log(`${this.name} drops ${item.name}.`);
  }

  createUI(config) {
    const { scene, x, y } = config;

    this.UIsprite = scene.add.sprite(x, y, 'tiles', this.tile)
      .setOrigin(0)
      .setInteractive({ useHandCursor: true });

    if (this.tint) {
      this.UIsprite.tint = this.tint;
    }

    this.UIsprite.on('pointerup', (pointer) => {
      if (pointer.leftButtonReleased()) {
        dungeon.describeEntity(this);
      }
    });
    this.UItext = scene.add.text(x + 20, y, this.name, { font: '12px Arial', fill: '#cfc6b8' })
      .setInteractive({ useHandCursor: true });

    this.UItext.on('pointerup', (pointer) => {
      if (pointer.leftButtonReleased()) {
        dungeon.describeEntity(this);
      }
    });

    return 30;
  }
}
