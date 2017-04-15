export default {
  goToPath: (path) => {
    window.location.hash = path;
  },
  getCurrentPath: () => {
    return window.location.hash.slice(1);
  },
};
