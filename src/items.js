/* eslint-disable no-undef */
/* eslint-disable import/extensions */
import Axe from './items/axe.js';
import Bow from './items/bow.js';
import CursedGem from './items/cursedGem.js';
import Gem from './items/gem.js';
import Hammer from './items/hammer.js';
import HealthPotion from './items/healthPotion.js';
import LongSword from './items/longSword.js';
import Potion from './items/potion.js';
import ScrollOfFireball from './items/scrollOfFireball.js';
import ScrollOfLightning from './items/scrollOfLightning.js';
import Shield from './items/shield.js';
import Sword from './items/sword.js';
import { getRandomTagsForItem } from './tags.js';

const items = {
  Axe,
  Bow,
  CursedGem,
  Gem,
  Hammer,
  HealthPotion,
  LongSword,
  Potion,
  ScrollOfFireball,
  ScrollOfLightning,
  Shield,
  Sword,
};

export default items;

export function getRandomItem(x, y, modifierCount = 1, effectCount = 1) {
  const key = Phaser.Utils.Array.GetRandom(Object.keys(items));
  const tags = getRandomTagsForItem(modifierCount, effectCount);
  return new items[key](x, y).addTags(tags);
}
