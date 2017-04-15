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
    return JSON.parse(localStorage.getItem(this._prefix_key(key)));
  }
}

export default StorageEngine;
