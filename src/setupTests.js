const localStorageMock = (function() {
  let store = {};
  return {
    getItem: function(key) {
      return store[key];
    },
    setItem: function(key, value) {
      store[key] = value.toString();
    },
    clear: function() {
      store = {};
    }
  };
})();
global.localStorage = localStorageMock;

import Router from './lib/Router';

Router.getCurrentPath = () => {
  return '/';
};
