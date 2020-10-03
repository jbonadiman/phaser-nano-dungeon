/* eslint-disable no-restricted-globals */
/* eslint-disable no-alert */
/* eslint-disable class-methods-use-this */
/* eslint-disable import/extensions */
/* eslint-disable no-undef */
import dungeon from './dungeon.js';

const defaultMP = 1;
const defaultAP = 1;

export default class PlayerCharacter {
  constructor(x, y) {
    this.name = 'Player';
    this.movementPoints = defaultMP;
    this.actionPoints = defaultAP;
    this.healthPoints = 15;
    this.power = 1;

    this.cursors = dungeon.scene.input.keyboard.createCursorKeys();
    this.x = x;
    this.y = y;
    this.tile = 29;
    this.moving = false;

    dungeon.initializeEntity(this);
  }

  getStatsText() {
    return `Hp: ${this.healthPoints}\nMp: ${this.movementPoints}\nAp: ${this.actionPoints}`;
  }

  refresh() {
    this.movementPoints = defaultMP;
    this.actionPoints = defaultAP;
  }

  attack() {
    return this.power;
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
          const enemy = dungeon.entityAtTile(newX, newY);

          if (enemy && this.actionPoints > 0) {
            dungeon.attackEntity(this, enemy);
            this.actionPoints -= 1;
          }

          newX = oldX;
          newY = oldY;
        }

        if (newX !== oldX || newY !== oldY) {
          dungeon.moveEntityTo(this, newX, newY);
        }
      }
    }

    if (this.healthPoints <= 6) {
      this.sprite.tint = Phaser.Display.Color.GetColor(255, 0, 0);
    }
  }

  over() {
    const isOver = this.movementPoints === 0 && !this.moving;

    if (isOver && this.UIHeader) {
      this.UIHeader.setColor('#cfc6b8');
    } else {
      this.UIHeader.setColor('#fff');
    }

    if (this.UIStatsText) {
      this.UIStatsText.setText(this.getStatsText());
    }

    return isOver;
  }

  onDestroy() {
    alert('OMG! you died!');
    location.reload();
  }

  createUI(config) {
    const {
      scene,
      x,
      y,
    } = config;

    let accumulatedHeight = 0;

    this.UIsprite = scene.add.sprite(x, y, 'tiles', this.tile).setOrigin(0);

    this.UIHeader = scene.add.text(
      x + 20,
      y,
      this.name,
      {
        font: '16px Arial',
        color: '#cfc6b8',
      },
    );

    this.UIStatsText = scene.add.text(
      x + 20,
      y + 20,
      this.getStatsText(),
      {
        font: '12px Arial',
        fill: '#cfc6b8',
      },
    );

    accumulatedHeight += this.UIStatsText.height + this.UIsprite.height;

    const itemsPerRow = 5;
    const rows = 2;
    this.UIitems = [];

    for (let row = 1; row <= rows; row += 1) {
      for (let cell = 1; cell <= itemsPerRow; cell += 1) {
        const rx = x + (25 * cell);
        const ry = y + 50 + (25 * row);
        this.UIitems.push(
          scene.add.rectangle(rx, ry, 20, 20, 0xcfc6b8, 0.3).setOrigin(0),
        );
      }
    }

    accumulatedHeight += 90;

    scene.add.line(x + 5, y + 120, 0, 10, 175, 10, 0xcfc6b8).setOrigin(0);
    return accumulatedHeight;
  }
}
