import tags from './tags.js';

export default class Taggable {
  addTagHandler(handlerName, handler) {
    if (!this.tagHandlers) {
      this.tagHandlers = {};
    }

    if (!this.tagHandlers[handlerName]) {
      this.tagHandlers[handlerName] = [];
    }

    this.tagHandlers[handlerName].push(handler);
  }

  executeTag(handlerName, ret, ...args) {
    if (this.tagHandlers && this.tagHandlers[handlerName]) {
      this.tagHandlers[handlerName].forEach((handler) => {
        args = [ret, ...args];
        ret = handler.apply(this.args);
      });
    }

    return ret;
  }

  wrapFunction(handlerName) {
    
  }
}

