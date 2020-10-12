const turnManager = {
  entities: new Set(),

  addEntity: (entity) => turnManager.entities.add(entity),
  removeEntity: (entity) => turnManager.entities.remove(entity),
  removeAllEntities: () => { turnManager.entities = new Set(); },
  refresh: () => {
    turnManager.entities.forEach((entity) => entity.refresh());
    turnManager.currentIndex = 0;
  },
  currentIndex: 0,
  turn: () => {
    if (turnManager.entities.size > 0) {
      const entities = [...turnManager.entities];
      const entity = entities[turnManager.currentIndex];

      if (!entity.over()) {
        entity.turn();
      } else {
        turnManager.currentIndex += 1;
      }
    }
  },
  over: () => [...turnManager.entities].every((entity) => entity.over()),
  cleanup: () => {
    turnManager.entities.forEach((entity) => {
      if (entity.sprite) {
        entity.sprite.destroy();
      }
      if (entity.UIsprite) {
        entity.UIsprite.destroy();
      }
    });
    turnManager.removeAllEntities();
  },
};

export default turnManager;
