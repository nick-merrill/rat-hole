class Router {
  goToPath(path) {
    window.location.hash = path;
  }

  getCurrentPath() {
    return window.location.hash.slice(1);
  }
}

export default new Router();
