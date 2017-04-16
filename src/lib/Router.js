import $ from 'jquery';

window.Router = window.Router ||
  {
    goToPath: (path) => {
      window.location.hash = path;
    },
    getCurrentPath: () => {
      return window.location.hash.slice(1);
    },
    subscribeToChange: (callback) => {
      $(window).on('hashchange', callback);
    },
    informOfChangeManually: () => {
      $(window).trigger('hashchange');
    },
  };

export default window.Router;
