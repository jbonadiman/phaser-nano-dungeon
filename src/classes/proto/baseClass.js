/* eslint-disable import/extensions */
/* eslint-disable no-undef */
import dungeon from '../../dungeon.js';
import Taggable from '../../taggable.js';

export default class BaseClass extends Taggable {
  constructor(x, y) {
    super(x, y);
    this.name = 'base class';
    this.movementPoints = 1;
    this.actionPoints = 1;
    this.healthPoints = 30;
    this.x = x;
    this.y = y;
    this.tile = 29;
    this.moving = false;
    this.type = 'character';
    this.items = [];
  }

  setEvents() {
    dungeon.scene.input.keyboard.addCapture(['SPACE', 'UP', 'DOWN', 'LEFT', 'RIGHT']);
    dungeon.scene.input.keyboard.on('keyup', (event) => {
      if (!this.over()) this.processInput(event);
      event.stopPropagation();
    });

    dungeon.scene.input.on('pointerup', (event) => {
      if (!this.over()) this.processTouchInput(event);
    });
  }

  turn() {
    if (this.healthPoints <= (this.healthPoints * 0.4)) {
      this.sprite.tint = Phaser.Display.Color.GetColor(255, 0, 0);
    }

    this.refreshUI();
  }

  toggleItem(itemNumber) {
    const item = this.items[itemNumber];
    if (item) {
      if (item.weapon) {
        // eslint-disable-next-line no-param-reassign
        this.items.forEach((i) => { i.active = i.weapon ? false : i.active; });
      }

      item.active = !item.active;

      if (item.active) {
        dungeon.log(`${this.name} equips ${item.name}: ${item.description}.`);
        item.equip(itemNumber, this);
      }
    }
  }

  removeItem(itemNumber) {
    const item = this.items[itemNumber];

    if (item) {
      this.items.forEach((i) => {
        i.UIsprite.destroy();
        // eslint-disable-next-line no-param-reassign
        delete i.UIsprite;
      });

      this.items = this.items.filter((i) => i !== item);
      this.refreshUI();
    }
  }

  removeItemByProperty(property, value) {
    this.items.forEach((i) => {
      i.UIsprite.destroy();
      // eslint-disable-next-line no-param-reassign
      delete i.UIsprite;
    });

    this.items = this.items.filter((i) => i[property] !== value);
    this.refreshUI();
  }

  equippedItems() {
    return this.items.filter((i) => i.active);
  }

  currentWeapon() {
    return this.equippedItems().find((item) => item.weapon);
  }

  attack() {
    return this.equippedItems()
      .reduce((total, item) => total + item.damage(), 0);
  }

  protection() {
    return this.equippedItems()
      .reduce((total, item) => total + item.protection(), 0);
  }

  getStatsText() {
    return `Hp: ${this.healthPoints}\nMp: ${this.movementPoints}\nAp: ${this.actionPoints}`;
  }

  refresh() {
    this.movementPoints = 1;
    this.actionPoints = 1;
  }

  processTouchInput(event) {
    const x = dungeon.map.worldToTileX(event.worldX);
    const y = dungeon.map.worldToTileY(event.worldY);

    const entity = dungeon.entityAtTile(x, y);

    if (entity && entity.type === 'enemy' && this.actionPoints > 0) {
      const currentWeapon = this.currentWeapon();
      const rangedAttack = currentWeapon.range() > 0
        ? currentWeapon.attackTile || currentWeapon.tile
        : false;

      const distance = dungeon.distanceBetweenEntities(this, entity);
      if (rangedAttack && distance <= currentWeapon.range()) {
        dungeon.attackEntity(this, entity, currentWeapon);
        this.actionPoints -= 1;
      }
    }
  }

  processInput(event) {
    const oldX = this.x;
    const oldY = this.y;
    let moved = false;
    let newX = this.x;
    let newY = this.y;

    let { key } = event;

    // Equip items
    if (!Number.isNaN(Number(key))) {
      if (key === 0) {
        key = 10;
      }

      this.toggleItem(key - 1);
    }

    if (event.key === 'd') {
      dungeon.goDown();
      return;
    }

    if (event.key === 'u') {
      dungeon.goUp();
      return;
    }

    // Spacebar check
    if (event.keyCode === 32) {
      this.movementPoints = 0;
      this.actionPoints = 0;
    }

    // Movement check
    if (event.key === 'ArrowLeft') {
      newX -= 1;
      moved = true;
    }

    if (event.key === 'ArrowRight') {
      newX += 1;
      moved = true;
    }

    if (event.key === 'ArrowUp') {
      newY -= 1;
      moved = true;
    }

    if (event.key === 'ArrowDown') {
      newY += 1;
      moved = true;
    }

    if (moved) {
      this.movementPoints -= 1;

      if (!dungeon.isWalkableTile(newX, newY)) {
        const entity = dungeon.entityAtTile(newX, newY);

        if (entity && entity.type === 'enemy' && this.actionPoints > 0) {
          const currentWeapon = this.currentWeapon();
          dungeon.attackEntity(this, entity, currentWeapon);
          this.actionPoints -= 1;
          this.movementPoints += 1;
        }

        if (entity && entity.type === 'item' && this.actionPoints > 0) {
          this.items.push(entity);
          dungeon.itemPicked(entity);
          dungeon.log(`${this.name} picked up ${entity.name}: ${entity.description}.`);
          this.actionPoints -= 1;
        } else {
          newX = oldX;
          newY = oldY;
        }

        if (entity && entity.type === 'stairs') {
          if (entity.direction === 'down') {
            dungeon.goDown();
          } else {
            dungeon.goUp();
          }
        }
      }

      if (newX !== oldX || newY !== oldY) {
        dungeon.moveEntityTo(this, newX, newY);
      }
    }
  }

  over() {
    const isOver = this.movementPoints <= 0 && !this.moving;

    if (isOver && this.UIheader) {
      this.UIheader.setColor('#cfc6b8');
      this.actionPoints = 0;
    } else {
      this.UIheader.setColor('#fff');
    }

    return isOver;
  }

  // eslint-disable-next-line class-methods-use-this
  onDestroy() {
    // eslint-disable-next-line no-alert
    alert('OMG! you died!');
    // eslint-disable-next-line no-restricted-globals
    location.reload();
  }

  createUI(config) {
    const {
      x,
      y,
    } = config;

    this.UIscene = config.scene;
    let accumulatedHeight = 0;

    this.UIsprite = this.UIscene.add.sprite(x, y, 'tiles', this.tile).setOrigin(0);

    this.UIheader = this.UIscene.add.text(
      x + 20,
      y,
      this.name,
      {
        font: '16px Arial',
        color: '#cfc6b8',
      },
    );

    this.UIstatsText = this.UIscene.add.text(
      x + 20,
      y + 20,
      this.getStatsText(),
      {
        font: '12px Arial',
        fill: '#cfc6b8',
      },
    );

    accumulatedHeight += this.UIstatsText.height + this.UIsprite.height;

    const itemsPerRow = 5;
    const rows = 2;
    this.UIitems = [];

    for (let row = 1; row <= rows; row += 1) {
      for (let cell = 1; cell <= itemsPerRow; cell += 1) {
        const rx = x + (25 * cell);
        const ry = y + 50 + (25 * row);
        this.UIitems.push(
          this.UIscene.add.rectangle(rx, ry, 20, 20, 0xcfc6b8, 0.3).setOrigin(0),
        );
      }
    }

    accumulatedHeight += 90;

    this.UIscene.add.line(x + 5, y + 120, 0, 10, 175, 10, 0xcfc6b8).setOrigin(0);
    return accumulatedHeight;
  }

  refreshUI() {
    for (let i = 0; i < this.items.length; i += 1) {
      const item = this.items[i];
      if (!item.UIsprite) {
        const x = this.UIitems[i].x + 10;
        const y = this.UIitems[i].y + 10;
        item.UIsprite = this.UIscene.add.sprite(x, y, 'tiles', item.tile)
          .setInteractive({ useHandCursor: true });

        item.UIsprite.on('pointerup', (pointer) => {
          if (pointer.leftButtonReleased()) {
            dungeon.describeEntity(item);
          }
        });
        if (item.tint) {
          item.UIsprite.tint = item.tint;
          item.UIsprite.tintFill = true;
        }
      }

      if (!item.active) {
        item.UIsprite.setAlpha(0.5);
        this.UIitems[i].setStrokeStyle();
      } else {
        item.UIsprite.setAlpha(1);
        this.UIitems[i].setStrokeStyle(1, 0xffffff);
      }
    }

    if (this.UIstatsText) {
      this.UIstatsText.setText(this.getStatsText());
    }
  }

  cleanup() {
    delete this.UIheader;
    delete this.UIstatsText;
    delete this.UIsprite;
    delete this.UIitems;
    delete this.UIscene;
    delete this.sprite;

    this.items.forEach((item) => {
      if (item.UIsprite) {
        // eslint-disable-next-line no-param-reassign
        delete item.UIsprite;
      }
    });
  }
}
