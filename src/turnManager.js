const turnManager = {
  interval: 150,
  entities: new Set(),
  lastCall: Date.now(),
  
  addEntity: (entity) => turnManager.entities.add(entity),
  removeEntity: (entity) => turnManager.entities.remove(entity),
  refresh: () => turnManager.entities.forEach(entity => entity.refresh()),
  turn: () => {
    const now = Date.now();
    const limit = turnManager.lastCall + turnManager.interval;

    if (now > limit) {
      for (const entity of turnManager.entities) {
        if (!entity.over()) {
          entity.turn();
          break;
        }
      }
      turnManager.lastCall = Date.now();
    }
  },
  over: () => [...turnManager.entities].every(entity => entity.over()),
}

export default turnManager;