window.Router = window.Router ||
  {
    goToPath: (path) => {
      window.location.hash = path;
    },
    getCurrentPath: () => {
      return window.location.hash.slice(1);
    },
    subscribeToChange: (callback) => {
      window.addEventListener('hashchange', callback);
    },
    informOfChangeManually: () => {
      window.fireEvent('hashchange');
    },
  };

export default window.Router;
