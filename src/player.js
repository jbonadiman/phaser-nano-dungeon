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
      this.sprites.tint = Phaser.Display.Color.GetColor(255, 0, 0);
    }
  }

  over() {
    return this.movementPoints === 0 && !this.moving;
  }

  onDestroy() {
    alert('OMG! you died!');
    location.reload();
  }
}
