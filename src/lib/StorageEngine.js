import _ from 'lodash';

/**
 * Stores items with prefix as JSON.
 */
class StorageEngine {
  constructor(prefix = 'global') {
    this.prefix = prefix;
  }

  _prefix_key(key) {
    return `${this.prefix}::${key}`;
  }

  set(key, value) {
    localStorage.setItem(this._prefix_key(key), JSON.stringify(value));
  }

  get(key) {
    let value = localStorage.getItem(this._prefix_key(key));
    if (_.isString(value)) {
      return JSON.parse(value);
    } else {
      return value;
    }
  }
}

export default StorageEngine;
