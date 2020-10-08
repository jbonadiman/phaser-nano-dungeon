/* eslint-disable no-undef */
/* eslint-disable import/extensions */
import aggro from './tags/aggro.js';
import wanderer from './tags/behavioural/wanderer.js';
import hunter from './tags/behavioural/hunter.js';
import patroller from './tags/behavioural/patroller.js';
import fast from './tags/fast.js';
import golden from './tags/golden.js';
import iron from './tags/iron.js';
import silver from './tags/silver.js';
import poison from './tags/poison.js';
import burning from './tags/burning.js';
import royal from './tags/royal.js';
import cursed from './tags/cursed.js';

const tags = {
  aggro,
  wanderer,
  patroller,
  hunter,
  fast,
  golden,
  silver,
  iron,
  poison,
  burning,
  royal,
  cursed,
};

export const materials = [
  'golden',
  'silver',
  'iron',
];

export const enemyModifiers = [
  'aggro',
  'fast',
  'royal',
];

export const behaviors = [
  'wanderer',
  'hunter',
  'patroller',
];

export const effects = [
  'poison',
  'burning',
  'cursed',
];

export function getRandomTagsForItem(modifierCount = 1, effectCount = 0) {
  const res = new Set();
  let mods = modifierCount;
  let fx = effectCount;

  while (mods > 0) {
    res.add(Phaser.Utils.Array.GetRandom(materials));
    mods -= 1;
  }

  while (fx > 0) {
    res.add(Phaser.Utils.Array.GetRandom(effects));
    fx -= 1;
  }

  return [...res];
}

export function getRandomTagsForEnemy(modifierCount = 1) {
  const res = new Set();
  let mods = modifierCount;

  while (mods > 0) {
    res.add(Phaser.Utils.Array.GetRandom(enemyModifiers));
    mods -= 1;
  }

  res.add(Phaser.Utils.Array.GetRandom(behaviors));

  return [...res];
}

export default tags;
