/* eslint-disable no-restricted-globals */
/* eslint-disable no-alert */
/* eslint-disable class-methods-use-this */
/* eslint-disable import/extensions */
/* eslint-disable no-undef */
import dungeon from './dungeon.js';
import Sword from './items/sword.js';

const initial = {
  MP: 1,
  AP: 1,
  HP: 15,
};

export default class PlayerCharacter {
  constructor(x, y) {
    this.name = 'Player';
    this.movementPoints = initial.MP;
    this.actionPoints = initial.AP;
    this.healthPoints = initial.HP;
    this.power = 1;

    this.cursors = dungeon.scene.input.keyboard.createCursorKeys();
    this.x = x;
    this.y = y;
    this.tile = 29;
    this.moving = false;
    this.type = 'character';
    this.items = [];

    this.items.push(new Sword());
    this.toggleItem(0);

    dungeon.initializeEntity(this);

    dungeon.scene.input.keyboard.on('keyup', (event) => {
      let { key } = event;

      if (!isNaN(Number(key))) {
        if (key === 0) {
          key = 10;
        }

        this.toggleItem(key - 1);
      }
    });
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
        item.equip(itemNumber);
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

  getStatsText() {
    return `Hp: ${this.healthPoints}\nMp: ${this.movementPoints}\nAp: ${this.actionPoints}`;
  }

  refresh() {
    this.movementPoints = initial.MP;
    this.actionPoints = initial.AP;
  }

  attack() {
    const items = this.equippedItems();
    return items.reduce((total, item) => total + item.damage(), 0);
  }

  turn() {
    const oldX = this.x;
    const oldY = this.y;
    let moved = false;
    let newX = this.x;
    let newY = this.y;

    if (this.movementPoints > 0) {
      if (this.cursors.left.isDown) {
        newX -= 1;
        moved = true;
      }

      if (this.cursors.right.isDown) {
        newX += 1;
        moved = true;
      }

      if (this.cursors.up.isDown) {
        newY -= 1;
        moved = true;
      }

      if (this.cursors.down.isDown) {
        newY += 1;
        moved = true;
      }

      if (moved) {
        this.movementPoints -= 1;

        if (!dungeon.isWalkableTile(newX, newY)) {
          const entity = dungeon.entityAtTile(newX, newY);

          if (entity && entity.type === 'enemy' && this.actionPoints > 0) {
            dungeon.attackEntity(this, entity);
            this.actionPoints -= 1;
          }

          if (entity && entity.type === 'item' && this.actionPoints > 0) {
            this.items.push(entity);
            dungeon.itemPicked(entity);
            dungeon.log(`${this.name} picked ${entity.name}: ${entity.description}`);
            this.actionPoints -= 1;
          } else {
            newX = oldX;
            newY = oldY;
          }
        }

        if (newX !== oldX || newY !== oldY) {
          dungeon.moveEntityTo(this, newX, newY);
        }
      }

      if (this.healthPoints <= (this.healthPoints * 0.4)) {
        this.sprite.tint = Phaser.Display.Color.GetColor(255, 0, 0);
      }
    }

    this.refreshUI();
  }

  over() {
    const isOver = this.movementPoints === 0 && !this.moving;

    if (isOver && this.UIheader) {
      this.UIheader.setColor('#cfc6b8');
    } else {
      this.UIheader.setColor('#fff');
    }

    if (this.UIstatsText) {
      this.UIstatsText.setText(this.getStatsText());
    }

    return isOver;
  }

  onDestroy() {
    alert('OMG! you died!');
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
        item.UIsprite = this.UIscene.add.sprite(x, y, 'tiles', item.tile);
      }

      if (!item.active) {
        item.UIsprite.setAlpha(0.5);
        this.UIitems[i].setStrokeStyle();
      } else {
        item.UIsprite.setAlpha(1);
        this.UIitems[i].setStrokeStyle(1, 0xffffff);
      }
    }
  }
}
