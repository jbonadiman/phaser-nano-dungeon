/* eslint-disable no-param-reassign */
/* eslint-disable import/extensions */
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
        ret = handler.apply(this, args);
      });
    }

    return ret;
  }

  wrapFunction(handlerName) {
    if (!this.tagHandlers || !this.tagHandlers[handlerName]) {
      const originalFunction = this[handlerName];
      this[handlerName] = (...args) => {
        const ret = originalFunction.apply(this, args);
        return this.executeTag(handlerName, ret, ...args);
      };
    }
  }

  addTag(template) {
    const tag = {};
    Object.assign(tag, template);

    const { name } = tag;
    delete tag.name;

    tag.initialize.apply(this);
    delete tag.initialize;

    Object.keys(tag).forEach((handlerName) => {
      this.wrapFunction(handlerName);
      this.addTagHandler(handlerName, tag[handlerName]);
    });

    if (!this.tags) {
      this.tags = [name];
    } else {
      this.tags.push(name);
    }

    return this;
  }

  removeTag(template) {
    const tag = {};
    Object.assign(tag, template);

    const { name } = tag;
    delete tag.name;
    delete tag.initialize;

    Object.keys(tag).forEach((handlerName) => {
      const functionAsString = tag[handlerName].toString();
      const handlerAsString = this.tagHandlers[handlerName].map((handler) => handler.toString());
      const index = handlerAsString
        .findIndex((handler) => handler === functionAsString);
      this.tagHandlers[handlerName].splice(index, 1);
    });

    const tagPosition = this.tags.findIndex((t) => t === name);
    this.tags.splice(tagPosition, 1);
  }

  addTags(templateNames) {
    templateNames.forEach((template) => {
      if (tags[template]) {
        this.addTag(tags[template]);
      }
    });

    return this;
  }
}
